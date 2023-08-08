"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";

import {
  FcCustomerSupport,
  FcServices,
  FcSerialTasks,
  FcList,
} from "react-icons/fc";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Card } from "@/components/Card";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          "url(https://w.wallhaven.cc/full/m9/wallhaven-m99e9m.jpg)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              Simplify your electricity bill management with our user-friendly
              platform.
            </Text>
            <Stack direction={"row"}>
              <Link href="/registration">
                <Button
                  bg={"orange.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "orange.500" }}
                  size={{ base: "md", md: "lg" }}
                >
                  Register Today
                </Button>
              </Link>
              <Link href="/fetch-bill">
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  size={{ base: "md", md: "lg" }}
                  color={"white"}
                  _hover={{ bg: "whiteAlpha.500" }}
                >
                  Get Bill
                </Button>
              </Link>
            </Stack>
          </Stack>
        </VStack>
      </Flex>

      <Stack minH="60vh">
        <Box p={4} mt="12">
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
              Just Click for Electricity
            </Heading>
            <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
              Our system offers a great deal of advantages to keep you
              comfortable.
            </Text>
          </Stack>

          <Container maxW={"5xl"} mt={12} pb="10">
            <Flex flexWrap="wrap" gridGap={6} justify="center">
              <Card
                heading={"Automated Billing"}
                icon={<Icon as={FcServices} w={10} h={10} />}
                description={
                  "Put an end to manual calculations. Our solution automates the billing process, resulting in accurate and timely electricity consumption invoices."
                }
              />
              <Card
                heading={"User-Friendly Dashboard"}
                icon={<Icon as={FcSerialTasks} w={10} h={10} />}
                description={
                  "Our user-friendly dashboard displays a comprehensive picture of your electricity usage, prior bills, and payment history. Keep an eye on your consumption patterns and make informed selections."
                }
              />
              <Card
                heading={"Instant Complaint Resolution"}
                icon={<Icon as={FcCustomerSupport} w={10} h={10} />}
                description={
                  "Use our site to file complaints or report problems. Our devoted support team provides prompt response and problem resolution."
                }
              />
              <Card
                heading={"Transparent Billing Breakdown"}
                icon={<Icon as={FcList} w={10} h={10} />}
                description={
                  "Get a detailed overview of your bill, including charges, taxes, and any other expenses. Understand your rates well to avoid confusion."
                }
              />
            </Flex>
          </Container>
        </Box>
      </Stack>
      <Footer />
    </>
  );
}
