"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [complaint, setComplaint] = useState<string | null>(null);
  const [complaintType, setComplaintType] = useState<
    "meterReading" | "slabRate" | null
  >(null);
  const [otp, setOtp] = useState<number | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleComplaintSubmit = () => {
    if (consumerId && billId && complaint && complaintType && otpVerified) {
      axios
        .post(
          "http://localhost:8080/api/consumer/createComplaint",
          {
            billDocId: billId,
            complaintType: complaintType,
            consumerDocId: consumerId,
            description: complaint,
          } as {
            description: string;
            billDocId: string;
            consumerDocId: string;
            complaintType: string;
          },
          { withCredentials: true }
        )
        .then(({ data }) => {
          console.log(data.message);
          if (data.success) {
            toast({
              title: `Created complaint successfully`,
              status: "success",
              isClosable: true,
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.status == 400) {
            toast({
              title: `Session Expired`,
              status: "error",
              isClosable: true,
            });
            router.push("/auth/login");
          } else {
            toast({
              title: response.data.message,
              status: "error",
              isClosable: true,
            });
          }

          setOtpVerified(false);
          setOtp(null);
          setOtpSent(false);
        });
    } else {
      toast({
        title: otpVerified ? "Not fields can be empty" : "OTP not verified",
        status: "error",
        isClosable: true,
      });
    }
  };

  const sendOtp = () => {
    if (consumerId) {
      axios
        .get(`http://localhost:8080/api/consumer/otp/${consumerId}`)
        .then(({ data }) => {
          if (data.success) {
            toast({
              title: data.message,
              status: "success",
              isClosable: true,
            });
            setOtpSent(true);
          }
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.status == 400) {
            toast({
              title: `Session Expired`,
              status: "error",
              isClosable: true,
            });
            router.push("/auth/login");
          } else {
            toast({
              title: response.data.message,
              status: "error",
              isClosable: true,
            });
          }
        });
    } else {
      toast({
        title: "ConsumerId cannot be null",
        status: "error",
        isClosable: true,
      });
    }
  };

  const verifyOtp = () => {
    axios
      .post("http://localhost:8080/api/consumer/verify-otp", {
        consumerId: consumerId,
        otp: otp,
      } as { consumerId: string; otp: number })
      .then(({ data }) => {
        if (data.success) {
          toast({
            title: data.message,
            status: "success",
            isClosable: true,
          });
          setOtpSent(true);
          setOtpVerified(true);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status == 400) {
          toast({
            title: `Session Expired`,
            status: "error",
            isClosable: true,
          });
          router.push("/auth/login");
        } else if (response.status == 401) {
          toast({
            title: response.data.message,
            status: "error",
            isClosable: true,
          });
          setOtpVerified(false);
        } else {
          toast({
            title: response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  useEffect(() => {
    console.log(
      `BillId: ${billId}\n ConsumerId: ${consumerId}\n complaint: ${complaint}\n complaintType: ${complaintType}`
    );
  }, [billId, consumerId, complaint, complaintType]);

  useEffect(() => {
    if (otpVerified) {
      handleComplaintSubmit();
    }
  }, [otpVerified]);

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
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter complaint text"
          mb={2}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Enter OTP</FormLabel>
        <Input
          value={otp || ""}
          onChange={(e) => setOtp(Number(e.target.value))}
          placeholder="Enter otp"
          mb={2}
          type="number"
          disabled={!otpSent}
        />
      </FormControl>
      {otp || otpSent ? (
        <Button onClick={verifyOtp} colorScheme="orange">
          Submit
        </Button>
      ) : (
        <Button onClick={() => sendOtp()}>Send OTP</Button>
      )}
    </Container>
  );
}
