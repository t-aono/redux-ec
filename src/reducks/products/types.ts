export interface ProductsState {
  products: ProductState;
}

export interface ProductState {
  list: [];
  currentPage: number;
  maxPage: number;
  perPage: number;
}
