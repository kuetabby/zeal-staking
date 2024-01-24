import axios from "axios";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

const apiKey = process.env.NEXT_PUBLIC_CHANGE_NOW_API_SECRET;

export const useStatusExchange = (id: string) => {
  const toast = useToast();

  const isIdValid = id.startsWith("0x") && id.length > 2;

  return useQuery(
    [id],
    async () => {
      try {
        const request = await axios({
          method: "GET",
          url: `/mixer/exchange/by-id?id=${id.substring(2)}`,
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
      enabled: !!id && !!isIdValid,
    }
  );
};
