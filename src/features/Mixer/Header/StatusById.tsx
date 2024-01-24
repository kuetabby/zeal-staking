import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  // Button,
  // ModalFooter,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { SearchOutlined } from "@ant-design/icons";

import { SearchStatusLoader } from "@/components/Loader/Status";

import { useStatusExchange } from "../@api/useStatusExchange";
import useDebounce from "@/hooks/useDebounce";

import { list_tokens } from "../@utils/tokens";
import { montserrat } from "@/utils/font";

import { StatusExchangeResponse } from "../@models";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StatusOrderById: React.FC<Props> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search, 250);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const {
    data: statusResponse,
    isFetching: isLoadingStatus,
    isSuccess: isSuccessStatus,
    refetch: refetchStatus,
  } = useStatusExchange(debounceSearch);

  const statusData: StatusExchangeResponse | undefined = statusResponse;

  const fromAmount = statusData?.expectedAmountFrom || statusData?.amountFrom;
  const toAmount = statusData?.expectedAmountTo || statusData?.amountTo;

  const onCloseModal = () => {
    setSearch("");
    onClose();
  };
  // console.log(statusData, "statusData");

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size={"xl"}>
      <ModalOverlay />
      <ModalContent className={`bg-dark-fade ${montserrat.className}`}>
        <ModalHeader className="text-center">
          Search Transaction
          <InputGroup className="mt-4">
            <InputLeftElement pointerEvents="none">
              <SearchOutlined />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter Transaction ID"
              className="focus:border-indigo-500 !shadow-none !outline-none"
              onChange={onChangeSearch}
            />
          </InputGroup>
        </ModalHeader>
        <ModalCloseButton className="text-red-500 font-bold" />
        <ModalBody
          className={`pt-2 pb-4 min-h-96 ${isLoadingStatus && "flex"}`}
        >
          {isLoadingStatus && <SearchStatusLoader />}

          {!isLoadingStatus && isSuccessStatus && statusData && (
            <>
              <div className="font-semibold text-lg">
                Please send the funds you would like to exchange
              </div>

              <div className="text-base mt-4">
                <div className="text-slate-500">Status</div>
                <div className="text-white font-bold text-lg">
                  {statusData?.status
                    ? `${
                        statusData?.status?.charAt(0)?.toUpperCase() +
                        statusData?.status?.slice(1)
                      }`
                    : "-"}
                </div>
              </div>

              <div className="text-base mt-4">
                <div className="text-slate-500">Send Amount</div>
                <div className="text-white font-bold text-lg">
                  {fromAmount && statusData?.fromNetwork
                    ? `${fromAmount} ${list_tokens
                        .find(
                          (item) =>
                            item.ticker === statusData.fromCurrency &&
                            item.network === statusData.fromNetwork
                        )
                        ?.name?.toUpperCase()}`
                    : "-"}
                </div>
              </div>

              <div className="text-base mt-4">
                <div className="text-slate-500">Deposit wallet</div>
                <div className="text-white font-bold text-lg">
                  {statusData?.payinAddress ? statusData.payinAddress : "-"}
                </div>
              </div>

              <div className="text-base mt-4">
                <div className="text-slate-500">Receive Amount</div>
                <div className="text-white font-bold text-lg">
                  {toAmount && statusData?.toNetwork
                    ? `${toAmount} ${list_tokens
                        .find(
                          (item) =>
                            item.ticker === statusData.toCurrency &&
                            item.network === statusData.toNetwork
                        )
                        ?.name?.toUpperCase()}`
                    : "-"}
                </div>
              </div>

              <div className="text-base mt-4">
                <div className="text-slate-500">Recipient Wallet</div>
                <div className="text-white font-bold text-lg">
                  {statusData?.payoutAddress ?? "-"}
                </div>
              </div>

              <div className="text-base mt-4 text-white">
                Important: Execute this trade promptly, with a deadline of 30
                minutes.
              </div>
            </>
          )}
        </ModalBody>

        {!isLoadingStatus && isSuccessStatus && statusData && (
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => refetchStatus()}
              isLoading={isLoadingStatus}
              className="mx-auto text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-500 disabled:bg-indigo-600 focus:bg-indigo-500 hover:disabled:bg-indigo-400"
            >
              Refresh Status
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
