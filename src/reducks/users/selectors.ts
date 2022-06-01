import { createSelector } from "reselect";
import { UsersState } from "./type";

const usersSelector = (state: UsersState) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.uid);
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);
export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);
export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders
);
export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);
export const getProductsInFavorite = createSelector(
  [usersSelector],
  (state) => state.favorite
);
