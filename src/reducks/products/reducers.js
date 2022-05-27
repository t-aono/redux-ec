import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ProductReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.SEARCH_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
