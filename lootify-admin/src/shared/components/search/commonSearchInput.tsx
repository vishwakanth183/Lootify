import React, { FC } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Search } from "@mui/icons-material";

const CommonSearchInput: FC<TextFieldProps> = props => {
  return (
    <TextField
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommonSearchInput;
