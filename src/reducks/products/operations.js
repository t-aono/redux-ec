import {
  firebaseTimestamp,
  getDocRef,
  saveDoc,
  getCollection,
  getQuery,
  removeDoc,
} from "../../firebase";
import { push } from "connected-react-router";
import { deleteProductAction, fetchProductsAction } from "./actions";

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    removeDoc("products", id).then(() => {
      const prevProducts = getState().products.list;
      const nextProducts = prevProducts.filter((product) => product.id !== id);
      dispatch(deleteProductAction(nextProducts));
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const productList = [];
    const query = getQuery("products", "update_at", "desc");
    const snapshots = await getCollection(query);
    snapshots.forEach((snapshot) => {
      const product = snapshot.data();
      productList.push(product);
    });
    dispatch(fetchProductsAction(productList));
  };
};

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  images,
  price,
  sizes
) => {
  return async (dispatch) => {
    const timestamp = firebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      sizes: sizes,
      update_at: timestamp,
    };

    if (id === "") {
      const ref = getDocRef("products");
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return saveDoc("products", id, data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
