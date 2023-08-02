"use client";

import SidebarWithHeader from "@/components/Sidebar";
import { ConsumerType } from "@/data/custom";
import { applications } from "@/data/dummy";
import {
  Heading,
  Text,
  Box,
  HStack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  VStack,
  Button,
  Avatar,
  ButtonGroup,
} from "@chakra-ui/react";
import { AiFillShop, AiFillHome } from "react-icons/ai";
import { BiSolidFactory } from "react-icons/bi";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

function getIconFromConsumerType(consumerType: ConsumerType): React.ReactNode {
  if (consumerType === "domestic") {
    return <AiFillHome size="21" />;
  } else if (consumerType === "commercial") {
    return <AiFillShop size="21" />;
  } else {
    return <BiSolidFactory size="21" />;
  }
}

export default function Home() {
  const router = useRouter();

  return (
    <>
      <SidebarWithHeader>
        <Box>
          <HStack justify="space-between" align="start">
            <Heading size="4xl" my="8">
              Hello, Admin
            </Heading>

            <HStack display={{ base: "none", md: "flex" }}>
              <Avatar name="Admin" />
              <VStack alignItems="flex-start" spacing="1px" ml="2">
                <Text>Admin</Text>
                <Button variant="outline" textColor="red.400" size="sm">
                  Sign Out
                </Button>
              </VStack>
            </HStack>
          </HStack>

          <HStack spacing="6" my="8" maxW="full" overflowX="auto">
            {Array(3)
              .fill(0)
              .map((item, index) => (
                <Box>
                  <Box
                    h="64"
                    key={index}
                    w="96"
                    border="1px"
                    borderColor="gray.300"
                    bg="gray.100"
                    rounded="3xl"
                  ></Box>
                </Box>
              ))}
          </HStack>

          {/* Applications List */}
          <Heading mb="4">Applications</Heading>
          <Text mb="8" fontFamily="custom">
            Here, you can find all new applications
          </Text>

          {/* Applications */}
          <TableContainer rounded="xl" border="1px" borderColor="orange.100">
            <Table variant="simple">
              <Thead bg="orange.400">
                <Tr>
                  <Th color="gray.100" isNumeric>
                    Consumer Type
                  </Th>
                  <Th color="gray.100" isNumeric>
                    Meter Number
                  </Th>
                  <Th color="gray.100">Full Name</Th>
                  <Th color="gray.100" isNumeric>
                    C.A. Number
                  </Th>
                  <Th color="gray.100" isNumeric>
                    Phone Number
                  </Th>
                  <Th color="gray.100">Application Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applications.map((application) => (
                  <Tr
                    _hover={{
                      bg: "gray.100",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      router.push(`applications/${application.consumerId}`)
                    }
                    key={application.consumerId}
                  >
                    <Td isNumeric>
                      <HStack>
                        <Box>
                          {getIconFromConsumerType(application.consumerType)}
                        </Box>
                        <Text>{application.consumerType.toUpperCase()}</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>#{application.meterNumber}</Td>
                    <Td>{application.fullName}</Td>
                    <Td isNumeric>{application.consumerId}</Td>
                    <Td isNumeric>{application.phoneNumber}</Td>
                    <Td>{application.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SidebarWithHeader>
    </>
  );
}

// <Td isNumeric>
//   <ButtonGroup variant="outline" spacing="6">
//     <Button colorScheme="orange">Approve</Button>
//     <Button>Reject</Button>
//   </ButtonGroup>
// </Td>;
