import { signInAction } from "./actions";
import { push } from "connected-react-router";
import {
  createUser,
  signInWithEmail,
  firebaseTimestamp,
  saveDoc,
  getSnapshot,
} from "../../firebase/index";

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須入力項目が未入力です");
      return false;
    }

    signInWithEmail(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        getSnapshot("users", uid).then((snapshot) => {
          const data = snapshot.data();

          dispatch(
            signInAction({
              isSignIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
            })
          );

          dispatch(push("/"));
        });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須入力項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return false;
    }

    return createUser(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = firebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "customer",
          uid: uid,
          update_at: timestamp,
          username: username,
        };

        saveDoc("users", uid, userInitialData).then(() => {
          dispatch(push("/signin"));
        });
      }
    });
  };
};
