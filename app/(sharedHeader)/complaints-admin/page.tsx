"use client";

import { useState } from "react";
import {
  Container,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
} from "@chakra-ui/react";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

interface Complaint {
  billDocId: string;
  complaintType: "meterReading" | "slabRates";
  consumerDocId: string;
  description: string;
  status: "Pending" | "Resolved" | "Rejected";
  complaintId: string;
}

export default function ComplaintsPage() {
  const [complaintText, setComplaintText] = useState("");
  const router = useRouter();
  const [billId, setBillId] = useState("");
  const [attachedDocuments, setAttachedDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      billDocId: "iq6x3iqJKhNIdh63Wjt5",
      complaintType: "meterReading",
      consumerDocId: "Zfm6aGLs5pmmRxSzE9bq",
      description:
        "i have got a bill that is higher than my electricity consumption",
      status: "Pending",
      complaintId: "lfyWfQ1eiIE4EqBEoKYJ",
    },
  ]);

  return (
    <Box>
      <Heading mb="4">Complaints</Heading>
      <Text mb="8" fontFamily="custom">
        Here, you can find all the complaints from consumers. Click on the row,
        to open bill correction page. To view the bill, click on the view Bill
        Button
      </Text>

      <Box mb="4">
        {complaints.length === 0 ? (
          <Text>No complaints yet.</Text>
        ) : (
          <>
            {/* Complaints */}
            <TableContainer rounded="xl" border="1px" borderColor="orange.100">
              <Box overflowY="auto" maxHeight="400px">
                <Table variant="simple">
                  <Thead bg="orange.400" position="sticky" top={0}>
                    <Tr>
                      <Th color="gray.100">Complaint ID</Th>
                      <Th color="gray.100">Description</Th>
                      <Th color="gray.100">Bill ID</Th>
                      <Th color="gray.100">Consumer ID</Th>
                      <Th color="gray.100">Complaint Type</Th>
                      <Th color="gray.100">Status</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {loading ? (
                      <Tr>
                        <Td colSpan={6}>
                          <Loader text="Fetching Complaints..." />
                        </Td>
                      </Tr>
                    ) : (
                      complaints.map((complaint: Complaint) => (
                        <Tr
                          _hover={{
                            bg: "gray.100",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            router.push("bills/" + complaint.billDocId)
                          }
                          key={complaint.complaintId}
                        >
                          <Td>
                            <HStack>
                              <Box></Box>
                              <Text>{complaint.complaintId}</Text>
                            </HStack>
                          </Td>
                          <Td>{complaint.description}</Td>
                          <Td>{complaint.billDocId}</Td>
                          <Td>{complaint.consumerDocId}</Td>
                          <Td isNumeric>{complaint.complaintType}</Td>
                          <Td>{complaint.status}</Td>
                          <Td>
                            {/* View Bill Button */}
                            <Button
                              as="a"
                              href={`http://localhost:8080/api/consumer/render-bill/${complaint.billDocId}`}
                              target="_blank"
                              colorScheme="blue"
                            >
                              View Bill
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </Box>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
}
