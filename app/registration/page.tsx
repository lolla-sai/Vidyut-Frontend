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
} from "@chakra-ui/react";

import React from "react";
import { Select } from "@chakra-ui/react";
import { useFormik } from "formik";
import { storage } from "@/config/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef } from "react";
import axios from "axios";
import * as Yup from "yup";

function CustomInput({
  label,
  fieldName,
  formik,
  required = false,
  ...inputProps
}: {
  label: string;
  fieldName: string;
  formik: any;
  required: boolean;
}) {
  return (
    <FormControl
      mb="4"
      isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
    >
      <HStack spacing="4">
        <FormLabel minW="15ch" mb="0" htmlFor={fieldName}>
          {label}
          {required ? (
            <Text as="span" ml="1" color="red.500">
              *
            </Text>
          ) : null}
        </FormLabel>
        <Input
          maxW="40ch"
          size="sm"
          id={fieldName}
          name={fieldName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values[fieldName] || ""}
          {...inputProps}
        />
      </HStack>
      <FormErrorMessage>{formik.errors[fieldName]}</FormErrorMessage>
    </FormControl>
  );
}

function CustomCheckbox({
  label,
  fieldName,
  formik,
}: {
  label: string;
  fieldName: string;
  formik: any;
}) {
  return (
    <>
      <Checkbox
        checked={formik.values[fieldName]}
        id={fieldName}
        name={fieldName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        mb="4"
      >
        {label}
      </Checkbox>
    </>
  );
}

function CustomSelect({
  label,
  fieldName,
  children,
  formik,
  required = false,
  ...rest
}: {
  label: string;
  fieldName: string;
  children: React.ReactNode;
  formik: any;
  required: boolean;
}) {
  return (
    <FormControl
      mb="4"
      isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
    >
      <HStack spacing="4" mb="4">
        <FormLabel minW="15ch" mb="0" htmlFor={fieldName}>
          {label}
          {required ? (
            <Text as="span" ml="1" color="red.500">
              *
            </Text>
          ) : null}
        </FormLabel>
        <Select
          variant="outline"
          maxW="35ch"
          size="sm"
          id={fieldName}
          name={fieldName}
          onChange={formik.handleChange}
          value={formik.values[fieldName]}
          {...rest}
        >
          {children}
        </Select>
      </HStack>
      <FormErrorMessage>{formik.errors[fieldName]}</FormErrorMessage>
    </FormControl>
  );
}

export default function Registration() {
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
      let urls: Array<string> = [];
      if (values.consumerType !== "Domestic") {
        [...values.supportingDocs].forEach(async (doc: Blob) => {
          const storageRef = ref(storage, "supportingDocs/" + doc?.name);
          await uploadBytesResumable(storageRef, doc);
          urls.push(await getDownloadURL(storageRef));
        });
      }
      let requestBody = {
        ...values,
        supportingDocs: urls,
      };
      console.log(requestBody);

      let response = await axios.post(
        "http://localhost:8080/api/consumer/createConsumer",
        requestBody,
        { withCredentials: true }
      );
      console.log(response);
    },
  });

  const inputRef = useRef(null);

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
// make theme orange
// whitespaces remove - slabs me
// put scrollbar only for the table
