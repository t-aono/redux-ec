import { createSelector } from "reselect";

const productsSelector = (state) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  (state) => state.list
);

export const getCurrentPage = createSelector(
  [productsSelector],
  (state) => state.currentPage
);
