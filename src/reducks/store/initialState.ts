const initialState = {
  products: {
    list: [],
    currentPage: 1,
    maxPage: 1,
    perPage: 6,
  },
  users: {
    cart: [],
    favorite: [],
    isSignedIn: false,
    orders: [],
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
