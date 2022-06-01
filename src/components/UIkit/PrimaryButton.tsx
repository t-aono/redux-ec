import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  backgroundColor: "#4dd0e1",
  color: "#000",
  fontSize: 16,
  height: 48,
  marginButton: 16,
  width: 256,
});

const PrimaryButton = (props: { label: string; onClick: () => void }) => {
  return (
    <CustomButton variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </CustomButton>
  );
};

export default PrimaryButton;
