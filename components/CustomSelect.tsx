import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";

export default function CustomSelect({
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
