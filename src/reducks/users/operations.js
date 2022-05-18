import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import {
  createUser,
  signInWithEmail,
  firebaseTimestamp,
  saveDoc,
  getSnapshot,
  onAuthState,
  signOutAuth,
  resetPasswordWithEmail,
} from "../../firebase/index";

export const listenAuthState = () => {
  return async (dispatch) => {
    onAuthState((user) => {
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
        });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須入力項目が未入力です");
      return false;
    } else {
      resetPasswordWithEmail(email)
        .then(() => {
          alert("パスワードリセット用のメールをお送りしました。");
          dispatch(push("/signin"));
        })
        .catch(() => alert(""));
    }
  };
};

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

export const signOut = () => {
  return async (dispatch) => {
    signOutAuth().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};
