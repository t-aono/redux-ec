import React from "react";
import { Divider } from "@mui/material";
import { TextDetail } from "../UIkit";
import OrderedProducts from "./OrderedProducts";

const dateToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

const OrderHistoryItem = (props) => {
  const order = props.order;
  const orderedDate = dateToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shipping_date.toDate());
  const price = "¥" + order.amount.toLocaleString();

  return (
    <div>
      <div className="module-spacer--small"></div>
      <TextDetail label="注文ID" value={order.id} />
      <TextDetail label="注文日付" value={orderedDate} />
      <TextDetail label="発送予定日" value={shippingDate} />
      <TextDetail label="注文金額" value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <div className="module-spacer--extra-extra-small"></div>
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
