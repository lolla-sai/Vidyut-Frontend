import { Checkbox } from "@chakra-ui/react";

export default function CustomCheckbox({
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
