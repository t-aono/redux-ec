import React from "react";
import { Delete, ShoppingCart } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomListItem = styled("div")({
  height: 128,
  display: "flex",
  alignItems: "center",
});

const CustomIconButton = styled(IconButton)({
  width: 48,
  height: 48,
});

const Image = styled("img")({
  objectFit: "cover",
  margin: 16,
  height: 96,
  width: 96,
});

const Text = styled("div")({
  width: "100%",
  textAlign: "left",
  padding: 8,
});

const ListItem = (props) => {
  const image = props.product.images[0].path;
  const name = props.product.name;
  const size = props.product.size;
  const price = props.product.price.toLocaleString();
  const remove = props.remove;
  const moveToCart = props.moveToCart ? props.moveToCart : null;

  return (
    <>
      <CustomListItem>
        <ListItemAvatar>
          <Image src={image} alt="商品画像" />
        </ListItemAvatar>
        <Text>
          <ListItemText primary={name} secondary={"サイズ：" + size} />
          <ListItemText primary={"¥" + price} />
        </Text>
        {moveToCart && (
          <CustomIconButton onClick={moveToCart}>
            <ShoppingCart />
          </CustomIconButton>
        )}
        <CustomIconButton onClick={remove}>
          <Delete />
        </CustomIconButton>
      </CustomListItem>
      <Divider />
    </>
  );
};

export default ListItem;
