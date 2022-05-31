import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../UIkit";

const CustomListItem = styled(ListItem)({
  background: "#fff",
  height: "auto",
});

const Image = styled("img")({
  objectFit: "cover",
  margin: "8px 16px 8px 0",
  height: 96,
  width: 96,
});

const Text = styled("div")({
  width: "100%",
});

const OrderedProducts = (props) => {
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = (id) => {
    dispatch(push("/product/" + id));
  };

  return (
    <List>
      {products.map((product) => (
        <div key={product.id}>
          <CustomListItem>
            <ListItemAvatar>
              <Image src={product.images[0].path} alt="ordered product" />
            </ListItemAvatar>
            <Text>
              <ListItemText
                primary={product.name}
                secondary={"サイズ：" + product.size}
              />
              <ListItemText primary={"¥" + product.price.toLocaleString()} />
            </Text>
            <PrimaryButton
              label="商品詳細を見る"
              onClick={() => goToProductDetail(product.id)}
            />
          </CustomListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default OrderedProducts;
