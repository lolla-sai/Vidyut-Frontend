import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { theme } from "./theme";

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
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default Providers;
