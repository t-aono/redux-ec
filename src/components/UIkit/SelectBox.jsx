import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";

const CustomFormControl = styled(FormControl)({
  marginBottom: 16,
  marginWidth: 128,
  width: "100%"
});

const SelectBox = (props) => {
  return (
    <CustomFormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required} value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.value}>{option.name}</MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
};

export default SelectBox;