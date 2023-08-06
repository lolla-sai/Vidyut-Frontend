"use client"; 

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
}

export default function ComplaintsPage() {
  const [complaintText, setComplaintText] = useState('');
  const [attachedDocuments, setAttachedDocuments] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleComplaintSubmit = () => {
    if (complaintText.trim() !== '') {
      const newComplaint: Complaint = {
        id: complaints.length + 1,
        text: complaintText,
        documents: attachedDocuments,
      };
      setComplaints([...complaints, newComplaint]);
      setComplaintText('');
      setAttachedDocuments([]);
    }
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
      <FormControl>
        <FormLabel>Add Complaint</FormLabel>
        <Input
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          placeholder="Enter complaint text"
          mb={2}
        />
        <input type="file" multiple onChange={handleDocumentUpload} />
        <Button onClick={handleComplaintSubmit} colorScheme="blue">
          Submit
        </Button>
      </FormControl>
      <VStack mt={4} align="start" spacing={4}>
        {complaints.map((complaint) => (
          <Box key={complaint.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
            <Text>{complaint.text}</Text>
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
