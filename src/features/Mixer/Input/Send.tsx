import { useRef, useEffect } from "react";
import Image from "next/image";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Input, useDisclosure } from "@chakra-ui/react";
import { DownOutlined } from "@ant-design/icons";

import { SelectCurrencyFrom } from "../Select/CurrencyFrom";

import type { MixerState, SelectMixerParams } from "../@models";

import "../style.css";

interface Props {
  state: MixerState;
  onChangeSendMixerAmount: (e: NumberFormatValues) => void;
  onChangeSendMixerCurrency: (params: SelectMixerParams) => void;
}

export const Send: React.FC<Props> = ({
  state,
  onChangeSendMixerAmount,
  onChangeSendMixerCurrency,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full mx-auto sm:mx-0 bg-dark-main rounded-2xl p-2">
      <div className="w-full flex items-center justify-between text-gray-500">
        <div className="text-xs font-semibold ml-2 mt-2 hover:text-white">
          You Send
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
          className="w-4/5 lg:w-[90%] border-none !shadow-none !outline-none font-semibold text-right"
          // getInputRef={inputRef}
          value={state.amount}
          onValueChange={onChangeSendMixerAmount}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={7}
          allowNegative={false}
          maxLength={18}
          customInput={Input}
          getInputRef={inputRef}
        />
      </div>
      <div className="w-full flex items-center justify-between text-gray-500">
        <div className="text-xs font-semibold ml-2 mb-1 hover:text-white">
          {state.name.toUpperCase()}
        </div>
      </div>
      <SelectCurrencyFrom
        isOpen={isOpen}
        state={state}
        onChangeSendMixerCurrency={onChangeSendMixerCurrency}
        onClose={onClose}
      />
    </div>
  );
};
