import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reducks/users/operations";
import { getIsSignedIn } from "./reducks/users/selectors";
import { UsersState } from "./reducks/users/type";
import { AnyAction, Dispatch } from "redux";

const Auth = ({ children }: { children: ReactNode }) => {
  const dispatch: any = useDispatch();
  const selector = useSelector((state: UsersState) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
