import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { theme } from "../../assets/theme";

const CustomButton = styled(Button)({
  backgroundColor: theme.palette.grey["300"],
  fontSize: 16,
  height: 48,
  marginButton: 16,
  width: 256,
});

const GreyButton = (props: { label: string; onClick: () => void }) => {
  return (
    <CustomButton variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </CustomButton>
  );
};

export default GreyButton;
