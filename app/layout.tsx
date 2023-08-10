"use client";
import "./globals.css";
import Providers from "@/components/Providers";
import { CacheProvider } from "@chakra-ui/next-js";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CacheProvider>
          <Providers>{children}</Providers>
        </CacheProvider>
      </body>
    </html>
  );
}

// Chakra with next link
{
  /* <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
  About
</Link> */
}

// Chakra with next font
{
  /* <style jsx global>
  {`
    :root {
      --font-rubik: ${rubik.style.fontFamily};
    }
  `}
</style> */
}
