import Image from "next/image";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Input, useDisclosure } from "@chakra-ui/react";
import { DownOutlined } from "@ant-design/icons";

import { SelectCurrencyTo } from "../Select/CurrencyTo";

import type { MixerState, SelectMixerParams } from "../@models";

import "../style.css";

interface Props {
  state: MixerState;
  onChangeReceiveMixerAmount: (e: NumberFormatValues) => void;
  onChangeReceiveMixerCurrency: (params: SelectMixerParams) => void;
}

export const Receive: React.FC<Props> = ({
  state,
  onChangeReceiveMixerAmount,
  onChangeReceiveMixerCurrency,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full mx-auto sm:mx-0 border border-gray-500 rounded-2xl p-2">
      <div className="w-full flex items-center justify-between text-gray-400">
        <div className="text-xs font-semibold ml-2 mt-2 hover:text-white">
          You Receive
        </div>
      </div>
      <div className="w-full flex items-center justify-between my-1">
        <div
          className="w-1/5 lg:w-[10%] flex items-center cursor-pointer hover:opacity-70 ml-4"
          onClick={onOpen}
        >
          <Image
            src={state.imageUrl}
            width={10}
            height={10}
            alt="send-network-icon"
            className="mr-2 w-6 h-6"
          />
          <DownOutlined />
        </div>

        <NumericFormat
          className="w-4/5 lg:w-[90%] border-none !shadow-none !outline-none font-semibold text-right disabled:text-white pointer-events-none"
          // getInputRef={inputRef}
          value={state.amount}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={7}
          allowNegative={false}
          maxLength={18}
          customInput={Input}
        />
      </div>
      <div className="w-full flex items-center justify-between text-gray-400">
        <div className="text-xs font-semibold ml-2 mb-1 hover:text-white">
          {state.name.toUpperCase()}
        </div>
      </div>
      <SelectCurrencyTo
        isOpen={isOpen}
        state={state}
        onChangeReceiveMixerCurrency={onChangeReceiveMixerCurrency}
        onClose={onClose}
      />
    </div>
  );
};
