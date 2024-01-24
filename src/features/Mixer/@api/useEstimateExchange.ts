import axios from "axios";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

import { MixerType, type EstimateExchange } from "../@models";

const apiKey = process.env.NEXT_PUBLIC_CHANGE_NOW_API_SECRET;

export const useEstimateExchange = ({
  flowType,
  fromAmount,
  fromCurrency,
  fromNetwork,
  toAmount,
  toCurrency,
  toNetwork,
}: EstimateExchange) => {
  const toast = useToast();

  return useQuery(
    [
      flowType,
      fromAmount,
      fromCurrency,
      fromNetwork,
      toAmount,
      toCurrency,
      toNetwork,
    ],
    async () => {
      try {
        const request = await axios({
          method: "GET",
          url: `/mixer/exchange/estimated-amount?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&fromAmount=${fromAmount}&toAmount=&fromNetwork=${fromNetwork}&toNetwork=${toNetwork}&flow=${flowType}&type=direct&${
            flowType === MixerType.FIXED ? "useRateId=true" : ""
          }`,
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "x-changenow-api-key": apiKey,
          },
        });

        const response = await request.data;
        return response;
      } catch (error: any) {
        // res.status().json({ error: 'An error occurred while processing your request.' });
        console.error(error);
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
    },
    {
      enabled: !!+fromAmount,
    }
  );
};
