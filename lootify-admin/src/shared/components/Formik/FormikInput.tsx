import React from "react";
import { TextField, TextFieldProps, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { Field, useField } from "formik";

type FormikInputProp = {
  name: string;
  label: string;
  required?: boolean;
  validation?: string | object;
  descriptionView?: boolean;
  // Add other relevant props as needed
};

const FormikInput: React.FC<FormikInputProp & TextFieldProps> = ({ name, label, required = false, validation, ...props }) => {
  const [field, meta] = useField(name); // Use array destructuring to match `useField` return type
  const error = meta.touched && meta.error;

  return (
    <Field
      as={TextField} // Integrate Field component for Formik integration
      fullWidth
      name={name}
      id={name}
      label={label}
      required={required}
      error={error ? true : undefined}
      helperText={error}
      margin="normal" // Adjust margin as needed for MUI styling
      {...props} // Pass any additional props to the TextField
    />
  );
};

export default FormikInput;
