import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { ProductReducer } from "../products/reducers";
import { UserReducer } from "../users/reducers";

import thunk from "redux-thunk";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      products: ProductReducer,
      router: connectRouter(history),
      users: UserReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
