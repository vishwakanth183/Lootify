import React from "react";
import { CheckboxProps, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { Field, useField } from "formik";

type FormikCheckBoxProp = {
  label: string;
  name: string;
  required?: boolean;
  validation?: string | object;
  // Add other relevant props as needed
};

const FormikCheckBox: React.FC<FormikCheckBoxProp & CheckboxProps> = ({ name, label, required = false, validation, ...props }) => {
  const [field, meta] = useField(name); // Use array destructuring to match `useField` return type
  const error = meta.touched && meta.error;

  return (
    <FormControlLabel
      sx={{ color: "black" }}
      control={
        <Field
          as={Checkbox} // Integrate Field component for Formik integration
          name={name}
          id={name}
          label={label}
          required={required}
          error={error ? true : undefined}
          helpertext={error ? error : ""}
          margin="normal" // Adjust margin as needed for MUI styling
          {...props} // Pass any additional props to the TextField
        />
      }
      label={label}
    />
  );
};

export default FormikCheckBox;
