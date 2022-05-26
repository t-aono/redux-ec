import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../assets/theme";
import { OrderHistoryItem } from "../components/Products";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { getOrdersHistory } from "../reducks/users/selectors";

const OrderList = styled('div')({
  background: theme.palette.grey['100'],
  margin: '0 auto',
  padding: 32,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },
  [theme.breakpoints.up('md')]: {
    width: 768
  }
});

const OrderHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const orders = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, []);

  return (
    <section className="c-section-wrapin">
      <OrderList>
        {orders.length > 0 && (
          orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
        )}
      </OrderList>
    </section>
  );
};

export default OrderHistory;