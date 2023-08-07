import React from "react";
import { HStack, Spinner, Text } from "@chakra-ui/react";

function Loader({
  text = "Fetching Application Details...",
}: {
  text: string;
}) {
  return (
    <HStack p="4" mx="auto" w="fit-content" spacing="4">
      <Spinner size="lg" />
      <Text fontSize="lg">{text}</Text>
    </HStack>
  );
}

export default Loader;
