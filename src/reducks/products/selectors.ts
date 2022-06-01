import { createSelector } from "reselect";
import { ProductsState } from "./types";

const productsSelector = (state: ProductsState) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  (state) => state.list
);

export const getCurrentPage = createSelector(
  [productsSelector],
  (state) => state.currentPage
);

export const getMaxPage = createSelector(
  [productsSelector],
  (state) => state.maxPage
);

export const getPerPage = createSelector(
  [productsSelector],
  (state) => state.perPage
);
