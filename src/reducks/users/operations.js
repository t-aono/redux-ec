import {
  fetchOrdersHistoryAction,
  fetchProductsInCartAction,
  fetchProductsInFavoriteAction,
  signInAction,
  signOutAction,
} from "./actions";
import { push } from "connected-react-router";
import {
  createUser,
  signInWithEmail,
  FirebaseTimestamp,
  updateDoc,
  getSnapshot,
  onAuthState,
  signOutAuth,
  resetPasswordWithEmail,
  addDoc,
  getDocRef,
  getQuery,
  getCollection,
} from "../../firebase/index";

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = getDocRef(["users", uid, "cart"]);
    addedProduct["cartId"] = cartRef.id;
    await addDoc(["users", uid, "cart", cartRef.id], addedProduct);
    dispatch(push("/"));
  };
};

export const addProductToFavorite = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const favoriteRef = getDocRef(["users", uid, "favorite"]);
    addedProduct["favoriteId"] = favoriteRef.id;
    await addDoc(["users", uid, "favorite", favoriteRef.id], addedProduct);
    dispatch(push("/"));
  };
};

export const moveProductToCart = (movedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = getDocRef(["users", uid, "cart"]);
    movedProduct["cartId"] = cartRef.id;
    await addDoc(["users", uid, "cart", cartRef.id], movedProduct);
    dispatch(push("/"));
  };
};

export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const list = [];

    const query = getQuery(["users", uid, "orders"], "updated_at", "desc");
    const snapshots = await getCollection(query);
    snapshots.forEach((snapshot) => {
      const data = snapshot.data();
      list.push(data);
    });

    dispatch(fetchOrdersHistoryAction(list));
  };
};

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products));
  };
};

export const fetchProductsInFavorite = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInFavoriteAction(products));
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    onAuthState((user) => {
      if (user) {
        const uid = user.uid;

        getSnapshot(["users", uid]).then((snapshot) => {
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

        getSnapshot(["users", uid]).then((snapshot) => {
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
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "customer",
          uid: uid,
          update_at: timestamp,
          username: username,
        };

        updateDoc(["users", uid], userInitialData).then(() => {
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
