"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Spacer,
  Select,
} from "@chakra-ui/react";

interface Complaint {
  id: number;
  text: string;
  documents: string[];
  billId: string;
}

export default function ComplaintsPage() {
  const [complaintText, setComplaintText] = useState("");
  const [billId, setBillId] = useState<string | null>(null);
  const [consumerId, setConsumerId] = useState<string | null>(null);
  const [attachedDocuments, setAttachedDocuments] = useState<string[]>([]);
  const [complaint, setComplaint] = useState<string | null>(null);
  const [complaintType, setComplaintType] = useState<
    "meterReading" | "slabRate" | null
  >(null);

  const handleComplaintSubmit = () => {};

  useEffect(() => {
    console.log(
      `BillId: ${billId}\n ConsumerId: ${consumerId}\n complaint: ${complaint}\n complaintType: ${complaintType}`
    );
  }, [billId, consumerId, complaint, complaintType]);

  return (
    <Container maxW="xl" mt={10}>
      <Heading mb={4}>Complaints</Heading>
      <FormControl isRequired>
        <FormLabel>Bill ID</FormLabel>
        <Input
          onChange={(e) => setBillId(e.target.value)}
          placeholder="Enter bill ID"
          mb={2}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Consumer ID</FormLabel>
        <Input
          onChange={(e) => setConsumerId(e.target.value)}
          placeholder="Enter consumer ID"
          mb={2}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Select the type of complaint</FormLabel>
        <Select
          onChange={(e) => {
            switch (e.target.value as "meterReading" | "slabRate") {
              case "meterReading":
                setComplaintType("meterReading");
                break;
              case "slabRate":
                setComplaintType("slabRate");
                break;
              default:
                setComplaintType(null);
                break;
            }
          }}
          placeholder="Select option"
          size="lg"
          mb={2}
        >
          <option value="meterReading">Meter Reading</option>
          <option value="slabRate">Slab Rate</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Add Complaint</FormLabel>
        <Input
          value={complaintText}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter complaint text"
          mb={2}
        />
      </FormControl>
      <Button onClick={handleComplaintSubmit} colorScheme="blue">
        Submit
      </Button>
    </Container>
  );
}
