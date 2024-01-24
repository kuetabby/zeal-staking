import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { CopyOutlined } from "@ant-design/icons";

import { ExchangeStatusLoader } from "@/components/Loader/Status";

import { useCopyText } from "@/hooks/useCopyText";
import { useStatusExchange } from "./@api/useStatusExchange";

import { list_tokens } from "./@utils/tokens";
import { montserrat } from "@/utils/font";

import { CreateExchangeResponse, StatusExchangeResponse } from "./@models";

interface Props {
  isOpen: boolean;
  data: CreateExchangeResponse;
  onResetExchangeData: () => void;
  onClose: () => void;
}

export const StatusOrder: React.FC<Props> = ({
  isOpen,
  data,
  onResetExchangeData,
  onClose,
}) => {
  const [copyContent] = useCopyText();

  const prefixId = "0x";
  const concatId = prefixId.concat(data.id);

  const {
    data: statusResponse,
    isFetching: isLoadingStatus,
    isSuccess: isSuccessStatus,
    refetch: refetchStatus,
  } = useStatusExchange(concatId);

  const statusData: StatusExchangeResponse | undefined = statusResponse;

  const fromAmount = statusData?.expectedAmountFrom || statusData?.amountFrom;
  const toAmount = statusData?.expectedAmountTo || statusData?.amountTo;

  const onCloseModal = () => {
    onResetExchangeData();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size={"lg"}>
      <ModalOverlay />
      <ModalContent className={`bg-dark-fade ${montserrat.className}`}>
        <ModalHeader>
          Mixing Transaction - {concatId}{" "}
          <CopyOutlined
            className="ml-2 cursor-pointer hover:text-indigo-600"
            onClick={() => {
              copyContent(concatId);
            }}
          />
          {/* Please send the funds you would like to exchange */}
        </ModalHeader>
        <ModalCloseButton className="text-red-500 font-bold" />
        <ModalBody className={`min-h-96  ${isLoadingStatus && "flex"}`}>
          {isLoadingStatus && <ExchangeStatusLoader />}

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
                minutes. Remember to save the transaction ID for real-time
                tracking of your transaction status.
              </div>
            </>
          )}
        </ModalBody>

        {!isLoadingStatus && (
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
