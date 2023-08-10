import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { theme } from "./theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useRouter } from "next-nprogress-bar";
import { useColorMode } from "@chakra-ui/react";
import KeyBindingHandler from "./KeyBindingHandler";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <KeyBindingHandler />
          {children}
          <ProgressBar
            height="4px"
            color="#ff8000"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default Providers;
