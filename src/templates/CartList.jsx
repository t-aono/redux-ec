import { List } from "@mui/material";
import { styled } from "@mui/system";
import { push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../components/Products/index";
import { GreyButton, PrimaryButton } from "../components/UIkit";
import { removeDoc } from "../firebase";
import { getProductsInCart, getUserId } from "../reducks/users/selectors";

const CartList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);
  const uid = getUserId(selector);

  const CustomList = styled(List)({
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  });

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'));
  }, []);

  const removeProductFromCart = useCallback(({ cartId }) => {
    return removeDoc(['users', uid, 'cart', cartId]);
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <CustomList>
        {productsInCart.length > 0 && (
          productsInCart.map(product => <ListItem key={product.cartId} product={product} remove={() => removeProductFromCart(product)} />)
        )}
      </CustomList>
      <div className="module-spacer--medium"></div>
      <div className="p-grid__column">
        <PrimaryButton label="レジへ進む" onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small"></div>
        <GreyButton label="ショッピングを続ける" onClick={backToHome} />
      </div>
    </section>
  );
};


export default CartList;