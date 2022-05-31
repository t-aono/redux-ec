import React from "react";
import { styled } from "@mui/material";

const Row = styled("div")({
  display: "flex",
  flexFlow: "row wrap",
  marginBottom: 16,
});

const Label = styled("div")({
  marginLeft: 0,
  marginRight: "auto",
});

const Value = styled("div")({
  fontWeight: 600,
  marginLeft: "auto",
  marginRight: 0,
});

const TextDetail = (props: { label: string; value: string }) => {
  return (
    <Row>
      <Label>{props.label}</Label>
      <Value>{props.value}</Value>
    </Row>
  );
};

export default TextDetail;
