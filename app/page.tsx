"use client";

import { Box, Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Text>Welcome to Home Page</Text>

      <HStack spacing="2" p="4">
        <Button as={NextLink} href="/applications">
          Go To Admin Page
        </Button>
        <Button as={NextLink} href="/registration">
          Registration
        </Button>
      </HStack>
    </>
  );
}
