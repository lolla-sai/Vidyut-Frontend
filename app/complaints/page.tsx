"use client"


import { useState } from 'react';
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
  Spacer,
} from '@chakra-ui/react';

interface Complaint {
  id: number;
  text: string;
  documents: string[];
  billId: string;
}

export default function ComplaintsPage() {
  const [complaintText, setComplaintText] = useState('');
  const [billId, setBillId] = useState('');
  const [attachedDocuments, setAttachedDocuments] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleComplaintSubmit = () => {
    if (complaintText.trim() === '' || billId.trim() === '' || attachedDocuments.length === 0) {
      // You can display an error message here or prevent the submission if fields are empty
      return;
    }

    const newComplaint: Complaint = {
      id: complaints.length + 1,
      text: complaintText,
      documents: attachedDocuments,
      billId: billId,
    };
    setComplaints([...complaints, newComplaint]);
    setComplaintText('');
    setBillId('');
    setAttachedDocuments([]);
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setAttachedDocuments([...attachedDocuments, ...fileNames]);
    }
  };

  return (
    <Container maxW="xl" mt={10}>
      <Heading mb={4}>Complaints</Heading>
      <FormControl isRequired>
        <FormLabel>Bill ID</FormLabel>
        <Input
          value={billId}
          onChange={(e) => setBillId(e.target.value)}
          placeholder="Enter bill ID"
          mb={2}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Add Complaint</FormLabel>
        <Input
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          placeholder="Enter complaint text"
          mb={2}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Attach Documents</FormLabel>
        <input type="file" multiple onChange={handleDocumentUpload} />
      </FormControl>
      <Button onClick={handleComplaintSubmit} colorScheme="blue">
        Submit
      </Button>
      <VStack mt={4} align="start" spacing={4}>
        {complaints.map((complaint) => (
          <Box key={complaint.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
            <Text>{complaint.text}</Text>
            <Text>Bill ID: {complaint.billId}</Text>
            {complaint.documents.length > 0 && (
              <VStack align="start" mt={2} spacing={1}>
                <Text fontWeight="bold">Attached Documents:</Text>
                {complaint.documents.map((document, index) => (
                  <Text key={index}>{document}</Text>
                ))}
              </VStack>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
