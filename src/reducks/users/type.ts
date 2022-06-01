import { Product, Order } from "../products/types";

export type UsersState = {
  users: UserState;
};

export type UserState = {
  uid?: string;
  username?: string;
  isSignedIn?: boolean;
  role?: string;
  orders?: Order[];
  cart?: ProductInCart[];
  favorite?: ProductInFavorite[];
};

interface Cart {
  cartId: string;
  size: string;
}

interface Favorite {
  favoriteId: string;
  size: string;
}

export type ProductInCart = Product & Cart;

export type ProductInFavorite = Product & Favorite;
