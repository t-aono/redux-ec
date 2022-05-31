import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";

const CustomFormControl = styled(FormControl)({
  marginBottom: 16,
  marginWidth: 128,
  width: "100%",
});

interface TMenuItem {
  id: string;
  value: string;
  name: string;
}

const SelectBox = (props: {
  label: string;
  required: boolean;
  value: string;
  select: (value: string) => void;
  options: TMenuItem[];
}) => {
  return (
    <CustomFormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
};

export default SelectBox;
