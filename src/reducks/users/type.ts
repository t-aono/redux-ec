export type UsersState = {
  users: UserState;
};

export type UserState = {
  uid?: string;
  username?: string;
  isSignIn?: boolean;
  role?: string;
  orders?: [];
  cart?: [];
  favorite?: [];
};
