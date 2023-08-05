"use client";

import {
  Heading,
  Button,
  Box,
  Flex,
  Stack,
  Input,
  HStack,
  Text,
  Checkbox,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import React from "react";
import { useFormik } from "formik";
import { storage } from "@/config/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef } from "react";
import axios from "axios";
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import CustomCheckbox from "@/components/CustomCheckbox";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";

export default function Registration() {
  const toast = useToast();
  const formikRef = useRef(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      consumerType: "Domestic",
      phoneNumber: null,
      address: "",
      phase: 1,
      supportingDocs: [],
      subsidy: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 25 characters or less")
        .required("Full Name is a required field"),
      email: Yup.string().email("Invalid email address").required("Required"),
      consumerType: Yup.string()
        .oneOf(["Commercial", "Domestic", "Industrial"])
        .required("This field is required"),
      phoneNumber: Yup.number()
        .min(1000000000, "Phone Number must have a min of 10 digits")
        .max(99999999999, "Phone Number cannot be greater than 11 digits")
        .required("Phone Number is required"),
      address: Yup.string(),
      phase: Yup.number().oneOf([1, 3]),
      subsidy: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      let urls: Array<{ url: string; fileName: string }> = [];
      if (values.consumerType !== "Domestic") {
        await Promise.all(
          [...values.supportingDocs].map(async (doc: Blob) => {
            const storageRef = ref(storage, "supportingDocs/" + doc?.name);
            await uploadBytesResumable(storageRef, doc);
            urls.push({
              url: await getDownloadURL(storageRef),
              fileName: doc.name,
            });
          })
        );
      }

      let requestBody = {
        ...values,
        supportingDocs: urls,
      };

      console.log(requestBody, "Request body");
      mutation.mutate(requestBody);
    },
  });

  const inputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: (requestBody) =>
      axios
        .post(
          "http://localhost:8080/api/consumer/createConsumer",
          requestBody,
          { withCredentials: true }
        )
        .then((res) => res.data),
    onMutate: () => formikRef?.current?.setSubmitting(true),
    onSettled: () => formikRef?.current?.setSubmitting(false),
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "We will inform you when it is accepted!",
        status: "success",
        duration: 3000,
        position: "top",
      });
      setTimeout(() => router.push("/"), 3000);
    },
    onError(error, variables, context) {
      if (error.response?.data) {
        toast({
          title: error.response.data.message,
          // description: "View your bills ",
          status: "error",
          duration: 3000,
          position: "top",
        });
      } else {
        toast({
          title: "Some Error Occured",
          description: "Please try again after some time!",
          status: "error",
          duration: 3000,
          position: "top",
        });
      }
    },
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <title>Registration</title>
      <Box maxW="1200px" p="4" px="8" mx="auto">
        <HStack mb="8" justify="space-between" align="center">
          <Heading fontWeight="extrabold" size="xl" mb="0">
            Registration
          </Heading>
          <Image
            alt={"Logo"}
            src={"/assets/logo.jpg"}
            style={{
              width: 150,
              height: 60,
              objectFit: "contain",
            }}
          />
        </HStack>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Box>
            <CustomInput
              label="Name"
              fieldName="fullName"
              formik={formik}
              required={true}
            />
            <CustomInput
              label="Email"
              fieldName="email"
              formik={formik}
              required={true}
              type="email"
            />

            {/* Connection Type */}
            <CustomSelect
              label="Connection Type:"
              fieldName="consumerType"
              required={true}
              formik={formik}
            >
              <option value="Domestic">Domestic</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
            </CustomSelect>

            {/* Phone Number */}
            <CustomInput
              label="Phone Number"
              fieldName="phoneNumber"
              formik={formik}
              required={true}
              type="number"
            />

            {/* Address */}
            <CustomInput label="Address" fieldName="address" formik={formik} />

            {/* Phase */}
            <CustomSelect
              label="Phase:"
              fieldName="phase"
              formik={formik}
              required={true}
              onChange={(e) => {
                console.log(e.target.value);
                formik.setFieldValue(
                  "phase",
                  e.target.value === "single" ? 1 : 3
                );
              }}
              value={formik.values.phase === 1 ? "single" : "three"}
            >
              <option value="single">Single</option>
              <option value="three">Multi-Phase(3)</option>
            </CustomSelect>

            <Text
              mb="4"
              h="0"
              overflow="hidden"
              maxW="prose"
              fontFamily="custom"
              fontSize="sm"
            >
              You have chosen to apply for subsidy. Upload the relevant
              documents, and click register.
            </Text>

            {/* Subsidy */}
            <CustomCheckbox
              label="I am eligible for subsidy"
              fieldName="subsidy"
              formik={formik}
            />

            {formik.values.subsidy && (
              <>
                <Text mb="4" maxW="prose" fontFamily="custom" fontSize="sm">
                  You have chosen to apply for subsidy. Upload the relevant
                  documents, and click register.
                </Text>

                {/* Supporting Docs */}
                {/* Put a file limit, file types */}
                <input
                  type="file"
                  id="subsidyDocs"
                  name="subsidyDocs"
                  multiple={true}
                  required={true}
                  onChange={(e) => {
                    formik.setFieldValue("supportingDocs", e.target.files);
                  }}
                  ref={inputRef}
                />
              </>
            )}

            {/* Register Button */}
            <Button
              w="full"
              colorScheme="orange"
              variant="solid"
              size="lg"
              my="8"
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Submitting Application..."
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
      <Flex flex={1} maxW={{ base: "100vw", md: "50vw" }}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.wallpaperscraft.com/image/single/light_bulb_light_sparks_305727_3840x2400.jpg"
          }
        />
      </Flex>
    </Stack>
  );
}

// admin is prefillled, mention
// whitespaces remove - slabs me
// put scrollbar only for the table
