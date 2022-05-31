export const PAGE_CHANGE = "PAGE_CHANGE";
export const pageChangeAction = (page) => {
  return {
    type: "PAGE_CHANGE",
    payload: page,
  };
};

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProductAction = (products) => {
  return {
    type: "DELETE_PRODUCT",
    payload: products,
  };
};

export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const searchProductAction = (products) => {
  return {
    type: "SEARCH_PRODUCT",
    payload: products,
  };
};

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products, maxPage) => {
  return {
    type: "FETCH_PRODUCTS",
    payload: { list: products, maxPage: maxPage },
  };
};
