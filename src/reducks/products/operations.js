import {
  firebaseTimestamp,
  getDocRef,
  getCollection,
  saveDoc,
} from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction } from "./actions";

// const productsSnapshots = getSnapshots("products", "update_at", "desc");
// console.log(productsSnapshots);

export const fetchProducts = () => {
  console.log("fetchProducts");
  return async (dispatch) => {
    const collection = getCollection("products");
    console.log(collection);
    // const productList = [];
    // snapshots.forEach((snapshot) => {
    //   const product = snapshot.data();
    //   productList.push(product);
    // });
    // console.log({ productList });
    // dispatch(fetchProductsAction(productList));
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
