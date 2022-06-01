import { ProductState } from "../products/types";

export type UsersState = {
  users: UserState;
};

export type UserState = {
  uid?: string;
  username?: string;
  isSignedIn?: boolean;
  role?: string;
  orders?: [];
  cart?: Cart[];
  favorite?: Favorite[];
};

interface CartId {
  cartId: string;
}

interface FavoriteId {
  favoriteId: string;
}

type Cart = ProductState & CartId;

type Favorite = ProductState & FavoriteId;
