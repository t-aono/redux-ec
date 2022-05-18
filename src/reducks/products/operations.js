import { firebaseTimestamp, getDocRef, saveDoc } from "../../firebase";
import { push } from "connected-react-router";

export const saveProduct = (name, description, category, gender, price) => {
  return async (dispatch) => {
    const timestamp = firebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      update_at: timestamp,
    };

    const ref = getDocRef("products");
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return saveDoc("products", id, data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
