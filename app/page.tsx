"use client";

import { Heading, Button, Text, Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box px="8" pt="8">
      <Heading mb="4">Vidyut</Heading>
      <Text mb="4" fontFamily="custom">
        This is some text in font inter
      </Text>
      <Button colorScheme="blue">Button</Button>
    </Box>
  );
}
