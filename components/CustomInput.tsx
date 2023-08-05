import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

export default function CustomInput({
  label,
  fieldName,
  formik,
  required = false,
  ...inputProps
}: {
  label: string;
  fieldName: string;
  formik: any;
  required?: boolean;
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
