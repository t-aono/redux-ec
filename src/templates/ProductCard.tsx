import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { MoreVert } from "@mui/icons-material";
import NoImage from "../assets/img/src/no_image.png";
import { deleteProduct } from "../reducks/products/operations";
import { theme } from "../assets/theme";

const CustomCard = styled(Card)({
  [theme.breakpoints.down("sm")]: {
    margin: 8,
    width: "calc(50% - 16px)",
  },
  [theme.breakpoints.up("sm")]: {
    margin: 16,
    width: "calc(33.3% - 32px)",
  },
});

const CustomCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "100%",
});

const CustomCardContent = styled(CardContent)({
  display: "flex",
  padding: "16px 8px",
  textAlign: "left",
  "&:last-child": {
    paddingBottom: 16,
  },
});

const CustomTypography = styled(Typography)({
  color: theme.palette.secondary,
  fontSize: 16,
});

const CustomIconButton = styled(IconButton)({
  width: 48,
  heigth: 48,
});

const ProductCard = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];
  const price = props.price.toLocaleString();

  return (
    <CustomCard>
      <CustomCardMedia
        image={images[0].path}
        onClick={() => dispatch(push("/product/" + props.id))}
      />
      <CustomCardContent>
        <div onClick={() => dispatch(push("/product/" + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <CustomTypography component="p">¥{price}</CustomTypography>
        </div>
        <CustomIconButton onClick={handleClick}>
          <MoreVert />
        </CustomIconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push("/product/edit/" + props.id));
            }}
          >
            <ListItemText>編集する</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id));
              handleClose();
            }}
          >
            <ListItemText>削除する</ListItemText>
          </MenuItem>
        </Menu>
      </CustomCardContent>
    </CustomCard>
  );
};

export default ProductCard;
