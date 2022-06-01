import { Timestamp } from "firebase/firestore";

export interface ProductsState {
  products: ProductState;
}

export interface ProductState {
  list: Product[];
  currentPage: number;
  maxPage: number;
  perPage: number;
}

export interface Product {
  id?: string;
  productId?: string;
  name: string;
  description: string;
  category: string;
  gender: number;
  images: string[];
  price: number;
  sizes: [];
  update_at: Timestamp;
}

export interface Order {
  amount: any;
  created_at: Timestamp;
  id: string;
  products: any[];
  shipping_date: Timestamp;
  updated_at: Timestamp;
}
