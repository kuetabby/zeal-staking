"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  trustWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
// import chakraTheme from "@chakra-ui/theme";

// import "react-tooltip/dist/react-tooltip.css";

const THIRDWEB_KEY = process.env.NEXT_PUBLIC_THIRDWEB_KEY;

interface Props extends PropsWithChildren {}

// const { Button, Skeleton } = chakraTheme.components;

const queryClient = new QueryClient();

// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: false,
// };

// const theme = extendTheme({
//   components: {
//     Button,
//     Skeleton,
//   },
// });

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider
        // theme={theme}
        toastOptions={{ defaultOptions: { duration: 3000, isClosable: true } }}
      >
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            activeChain="ethereum"
            clientId={THIRDWEB_KEY}
            supportedWallets={[
              metamaskWallet(),
              trustWallet(),
              coinbaseWallet(),
              walletConnect(),
            ]}
          >
            {children}
          </ThirdwebProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Provider;
