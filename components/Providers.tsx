import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({
  colors,
  fonts: {
    custom: "var(--font-inter)",
  },
});

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
