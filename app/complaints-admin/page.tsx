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
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { AiOutlineFile } from 'react-icons/ai';

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

  return (
    <Container maxW="xl" mt={10}>
      <Heading mb={4}>Complaints</Heading>
      <VStack mt={4} align="start" spacing={4}>
        {complaints.length === 0 ? (
          <Text>No complaints yet.</Text>
        ) : (
          <List spacing={3}>
            {complaints.map((complaint) => (
              <ListItem key={complaint.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                <Text fontSize="xl">{complaint.text}</Text>
                <Text>Bill ID: {complaint.billId}</Text>
                {complaint.documents.length > 0 && (
                  <VStack align="start" mt={2} spacing={1}>
                    <Text fontWeight="bold">Attached Documents:</Text>
                    <List spacing={1}>
                      {complaint.documents.map((document, index) => (
                        <ListItem key={index}>
                          <ListIcon as={AiOutlineFile} />
                          {document}
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
}
