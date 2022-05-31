import React, { useCallback, useMemo } from "react";
import { Divider, List } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../assets/theme";
import { ListItem } from "../components/Products";
import { PrimaryButton, TextDetail } from "../components/UIkit";
import { orderProduct } from "../reducks/products/operations";
import { getProductsInCart } from "../reducks/users/selectors";

const DetailBox = styled("div")({
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    width: 320,
  },
  [theme.breakpoints.up("sm")]: {
    width: 512,
  },
});

const OrderBox = styled("div")({
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
  boxShadow: "0 4px 2px 2px rgba(0, 0, 0, 0.2)",
  height: 256,
  margin: "24px auto 16px auto",
  padding: 16,
  width: 288,
});

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const shippingFee = subtotal >= 10000 ? 0 : 210;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <DetailBox>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <ListItem key={product.cartId} product={product} />
              ))}
          </List>
        </DetailBox>
        <OrderBox>
          <TextDetail label="商品合計" value={subtotal.toLocaleString()} />
          <TextDetail label="消費税" value={"¥" + tax.toLocaleString()} />
          <TextDetail label="送料" value={"¥" + shippingFee.toLocaleString()} />
          <Divider />
          <TextDetail
            label="合計（税込）"
            value={"¥" + total.toLocaleString()}
          />
          <PrimaryButton label="注文する" onClick={order} />
        </OrderBox>
      </div>
    </section>
  );
};

export default OrderConfirm;
