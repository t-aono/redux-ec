import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ProductReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.payload,
      };
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
        list: [...action.payload.list],
        maxPage: action.payload.maxPage,
      };
    default:
      return state;
  }
};
