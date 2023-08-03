"use client";

import { Box, ButtonGroup, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Text>Welcome to Home Page</Text>

      <Box>
        <NextLink href="/applications">Go To Admin Page</NextLink>
        <NextLink href="/applications">Registration</NextLink>
      </Box>
    </>
  );
}
