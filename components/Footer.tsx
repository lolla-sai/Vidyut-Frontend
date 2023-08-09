"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

import { ReactElement } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { chakra, VisuallyHidden } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import { VStack } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "./Logo";
import { AiFillHeart } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"clear"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"orange"} size={"sm"}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

const SocialButton = ({
  children,
  label,
  href,
  hoverColor,
}: {
  children: ReactNode;
  label: string;
  href: string;
  hoverColor?: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        color: hoverColor,
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"/hero"}>
            Home
          </Box>
          <Box as="a" href={"/about"}>
            About
          </Box>
          <Box as="a" href={"/complaints"}>
            Complaints
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={3}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2023 Vidyut Pvt. Ltd. All rights reserved</Text>
          <HStack fontSize="lg" fontWeight="bold">
            <Text>Made with </Text>
            <AiFillHeart color="#ff7000" size="24" />{" "}
            <Text>by Team Vidyut</Text>
          </HStack>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Email"}
              href={
                "mailto:sskapadi@oneshield.com?subject=Write%20Your%20Subject%20Here%20-%20Vidyut&body=Hello%20Vidyut%2C%0A%0A%3CProblem%20Goes%20Here%3E%0A%0AConsumer%20ID%3A%20%0ABill%20ID%3A%20%0AAddress%3A%20%0A%0AThank%20You%0A%3CYour%20Name%3E"
              }
              hoverColor="red.500"
            >
              <BiLogoGmail />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"} hoverColor="red.300">
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
