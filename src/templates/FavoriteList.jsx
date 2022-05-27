import { List } from "@mui/material";
import { styled } from "@mui/system";
import { push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../components/Products";
import { GreyButton } from "../components/UIkit";
import { removeDoc } from "../firebase";
import { getProductsInFavorite, getUserId } from "../reducks/users/selectors";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInFavorite = getProductsInFavorite(selector);
  const uid = getUserId(selector);

  const CustomList = styled(List)({
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  });

  const backToHome = useCallback(() => {
    dispatch(push('/'));
  }, []);

  const removeProductFromFavorite = (id) => {
    return removeDoc(['users', uid, 'favorite', id]);
  };

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">お気に入り</h2>
      <CustomList>
        {productsInFavorite.length > 0 && (
          productsInFavorite.map(product => <ListItem key={product.favoriteId} product={product} remove={() => removeProductFromFavorite(product.favoriteId)} />)
        )}
      </CustomList>
      <div className="module-spacer--medium"></div>
      <GreyButton label="ショッピングを続ける" onClick={backToHome} />
    </section>
  );
};


export default FavoriteList;