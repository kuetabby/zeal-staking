// curl --location 'https://api.changenow.io/v2/validate/address?currency=btc&address=12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y'

import axios from "axios";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

import { AddressValidationParams } from "../@models";

export const useAddressValidation = ({
  address,
  network,
  toggle,
  closeToggle,
}: AddressValidationParams & { toggle: boolean; closeToggle: () => void }) => {
  const toast = useToast();

  return useQuery(
    [network, address, toggle],
    async () => {
      try {
        const request = await axios({
          method: "GET",
          url: `/mixer/validate/address?currency=${network}&address=${address}`,
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        });

        const response = await request.data;

        if (response && !response?.result) {
          toast({
            title: response?.message,
            status: "error",
          });
        }

        return response;
      } catch (error: any) {
        closeToggle();
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
      enabled: !!address && !!toggle,
    }
  );
};
