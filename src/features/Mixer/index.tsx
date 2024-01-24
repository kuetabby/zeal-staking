"use client";
import { useEffect, useState } from "react";
import { Button, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { Card } from "antd";
import { NumberFormatValues } from "react-number-format";
import { ArrowDownOutlined } from "@ant-design/icons";

import MixerHeader from "./Header";
import { Send } from "./Input/Send";
import { Receive } from "./Input/Receive";
import { StatusOrder } from "./Status";

import Loader from "@/components/Loader";

import useDebounce from "@/hooks/useDebounce";
import { useIsMounted } from "@/hooks/useIsMounted";

import { useEstimateExchange } from "./@api/useEstimateExchange";
// import { useAddressValidation } from "./api/useAddressValidation";
import { useCreateExchange } from "./@api/useCreateExchange";

// import { SwitchIcon } from "@/utils/Icon/switchIcon";

import {
  CreateExchangeResponse,
  MixerState,
  MixerType,
  SelectMixerParams,
} from "./@models";

import "./style.css";

interface Props {}

const initialSendMixer: MixerState = {
  network: "eth",
  currency: "eth",
  name: "ETH (ERC20)",
  imageUrl: "/uploads/eth_f4ebb54ec0.svg",
  amount: "1",
  supportsFixedRate: true,
};

const initialReceiveMixer: MixerState = {
  network: "eth",
  currency: "usdt",
  name: "USDT (ERC20)",
  imageUrl: "/uploads/usdterc20_5ae21618aa.svg",
  amount: "",
  supportsFixedRate: true,
};

const Mixer: React.FC<Props> = () => {
  const [sendMixer, setSendMixer] = useState(initialSendMixer);
  const [receiveMixer, setReceiveMixer] = useState(initialReceiveMixer);
  const [typeMixer, setTypeMixer] = useState(MixerType.FIXED);

  const [exchangeData, setExchangeData] = useState<
    CreateExchangeResponse | undefined
  >();

  const [recipientAddress, setRecipientAddress] = useState("");
  const debounceRecipientAddress = useDebounce(recipientAddress, 200);

  const isMounted = useIsMounted();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const { mutateAsync: createExchange, isLoading: isLoadingCreateExchange } =
    useCreateExchange();

  const {
    data: estimateExchange,
    isSuccess: isSuccessEstimate,
    isFetching: isFetchingEstimate,
    isLoading: isLoadingEstimate,
    refetch: refetchEstimate,
  } = useEstimateExchange({
    flowType: typeMixer,
    fromAmount: sendMixer.amount,
    fromCurrency: sendMixer.currency,
    fromNetwork: sendMixer.network,
    toAmount: receiveMixer.amount,
    toCurrency: receiveMixer.currency,
    toNetwork: receiveMixer.network,
  });

  const isSwitchDisabled =
    !sendMixer.supportsFixedRate || !receiveMixer.supportsFixedRate;

  // const { data: isAddressValid } = useAddressValidation({
  //   address: debounceRecipientAddress,
  //   network: sendMixer.network,
  //   toggle: isClicked,
  //   closeToggle: onClose,
  // });

  useEffect(() => {
    if (isSuccessEstimate && estimateExchange) {
      setReceiveMixer((state) => ({
        ...state,
        amount: String(estimateExchange?.toAmount),
      }));
    }
  }, [estimateExchange, isSuccessEstimate]);

  const onChangeSendMixerCurrency = ({
    curr,
    imageUrl,
    name,
    network,
    supportsFixedRate,
  }: SelectMixerParams) => {
    setSendMixer((state) => ({
      ...state,
      currency: curr,
      network,
      imageUrl,
      name,
      supportsFixedRate,
    }));

    if (!supportsFixedRate) {
      setTypeMixer(MixerType.FLOAT);
    }
  };

  const onChangeSendMixerAmount = (values: NumberFormatValues) => {
    setSendMixer((state) => ({
      ...state,
      amount: values.value,
    }));
  };

  const onChangeReceiveMixerCurrency = ({
    curr,
    imageUrl,
    name,
    network,
    supportsFixedRate,
  }: SelectMixerParams) => {
    setReceiveMixer((state) => ({
      ...state,
      currency: curr,
      network,
      imageUrl,
      name,
      supportsFixedRate,
    }));

    if (!supportsFixedRate) {
      setTypeMixer(MixerType.FLOAT);
    }
  };

  const onChangeReceiveMixerAmount = (values: NumberFormatValues) => {
    setReceiveMixer((state) => ({
      ...state,
      amount: values.value,
    }));
  };

  const onChangeTypeMixer = (type: MixerType) => {
    setTypeMixer(type);
  };

  const onChangeRecipientAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };

  const onSwitchMixer = () => {
    const main = sendMixer;
    const secondary = receiveMixer;

    setSendMixer(secondary);
    setReceiveMixer(main);
  };

  const onCreateExchange = async () => {
    const DataJSON = {
      fromAmount: sendMixer.amount,
      fromCurrency: sendMixer.currency,
      fromNetwork: sendMixer.network,
      toCurrency: receiveMixer.currency,
      toNetwork: receiveMixer.network,
      toAmount: "",
      address: debounceRecipientAddress,
      flow: typeMixer,
      type: "direct",
      rateId: typeMixer === MixerType.FIXED ? estimateExchange?.rateId : "",
    };

    try {
      const request = await createExchange(DataJSON);
      const response = await request;

      setRecipientAddress("");
      setTypeMixer(MixerType.FIXED);
      setExchangeData(response);

      onOpen();

      // console.log(response, "response");

      return response;
    } catch (error: any) {
      // console.error(error);
      let errorMessage = "An error occurred while processing your request";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || error.response.data;
        status = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      toast({
        title: errorMessage,
        status: "error",
      });
    }
  };

  const onResetExchangeData = () => {
    setExchangeData(undefined);
  };

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="mix-container">
      <div id="mix" className="h-12 relative" />
      <div className="w-full md:w-11/12 h-full relative mx-auto">
        {/* <div className="h-12 md:h-20 relative" /> */}
        <Card
          className="!bg-dark-secondary w-full sm:w-96 lg:w-[30em] 2xl:w-[45%] !rounded-2xl !mx-auto text-center !text-white"
          bodyStyle={{
            padding: "1em",
          }}
          bordered={false}
        >
          <MixerHeader
            refetchEstimate={refetchEstimate}
            isFetchingEstimate={isFetchingEstimate}
            isSuccessEstimate={isSuccessEstimate}
          />
          <div className="flex flex-wrap justify-between items-center">
            <Send
              state={sendMixer}
              onChangeSendMixerAmount={onChangeSendMixerAmount}
              onChangeSendMixerCurrency={onChangeSendMixerCurrency}
            />

            <div
              className={`w-full text-center -my-1 z-50  ${
                isSwitchDisabled && "pointer-events-none"
              }`}
              onClick={onSwitchMixer}
            >
              <div className="switcher-wrapper">
                <ArrowDownOutlined
                  className="mt-1 switcher-icon"
                  style={{ fontSize: "1.25em" }}
                />
              </div>
            </div>

            <Receive
              state={receiveMixer}
              onChangeReceiveMixerAmount={onChangeReceiveMixerAmount}
              onChangeReceiveMixerCurrency={onChangeReceiveMixerCurrency}
            />
          </div>

          <div className="h-6 relative" />
          <div className="w-full border border-gray-500 rounded-2xl pl-2 pt-2 pr-2">
            <span className="text-xs text-left text-gray-500 hover:text-white font-semibold">
              Recipient
            </span>
            <Input
              value={recipientAddress}
              onChange={onChangeRecipientAddress}
              className="w-full mx-auto my-2 !border-t-0 !border-l-0 !border-r-0 focus:border-b-indigo-500 !shadow-none !outline-none"
              color={"white"}
              placeholder="Your Recipient Address"
              _placeholder={{
                textColor: "white",
              }}
            />
          </div>

          <div className="h-6 relative" />
          <div className="w-full border border-gray-500 rounded-2xl pl-2 pt-2 pr-2">
            <span className="text-xs text-left text-gray-500 hover:text-white font-semibold">
              Mix Type
            </span>
            <div className="w-full my-2 flex justify-center">
              <Button
                className={`w-1/2 sm:w-24 border-2 ${
                  typeMixer === MixerType.FIXED
                    ? "!border-indigo-500 !text-indigo-500"
                    : "border-gray-500 text-gray-500"
                } 
                ${isSwitchDisabled && "pointer-events-none"}
                rounded-tr-none rounded-br-none !bg-transparent hover:text-white hover:border-white`}
                onClick={() => onChangeTypeMixer(MixerType.FIXED)}
              >
                Fixed
              </Button>
              <Button
                className={`w-1/2 sm:w-24 border-2 ${
                  typeMixer === MixerType.FLOAT
                    ? "!border-indigo-500 !text-indigo-500"
                    : "border-gray-500 text-gray-500"
                } 
                ${isSwitchDisabled && "pointer-events-none"}
                rounded-tl-none rounded-bl-none border-l-0 !bg-transparent hover:text-white hover:border-white`}
                onClick={() => onChangeTypeMixer(MixerType.FLOAT)}
              >
                Dynamic
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-evenly mt-4 text-center">
            <Button
              // colorScheme="yellow"
              isDisabled={!recipientAddress}
              onClick={onCreateExchange}
              isLoading={isLoadingEstimate || isLoadingCreateExchange}
              className="w-full rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-500 disabled:bg-indigo-600 focus:bg-indigo-500 hover:disabled:bg-indigo-400"
            >
              Mix
            </Button>
          </div>
        </Card>
      </div>
      {isOpen && exchangeData && (
        <StatusOrder
          isOpen={isOpen}
          data={exchangeData}
          onResetExchangeData={onResetExchangeData}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Mixer;
