import React, { useEffect } from "react";
import { Favorite, MoreVert, ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listenCollection } from "../../firebase";
import {
  getProductsInCart,
  getProductsInFavorite,
  getUserId,
} from "../../reducks/users/selectors";
import {
  fetchProductsInCart,
  fetchProductsInFavorite,
} from "../../reducks/users/operations";
import { push } from "connected-react-router";
import { UsersState } from "../../reducks/users/type";

const HeaderMenus = (props) => {
  const dispatch: any = useDispatch();
  const selector = useSelector((state: UsersState) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductsInCart(selector);
  let productsInFavorite = getProductsInFavorite(selector);

  useEffect(() => {
    const unsubscribe = listenCollection(
      ["users", uid, "cart"],
      (snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInCart(productsInCart));
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenCollection(
      ["users", uid, "favorite"],
      (snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInFavorite.push(product);
              break;
            case "modified":
              const index = productsInFavorite.findIndex(
                (product) => product.favoriteId === change.doc.id
              );
              productsInFavorite[index] = product;
              break;
            case "removed":
              productsInFavorite = productsInFavorite.filter(
                (product) => product.favoriteId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInFavorite(productsInFavorite));
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(push("/favorite"))}>
        <Badge badgeContent={productsInFavorite.length} color="secondary">
          <Favorite />
        </Badge>
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MoreVert />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
