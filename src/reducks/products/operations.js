import {
  FirebaseTimestamp,
  getDocRef,
  updateDoc,
  getCollection,
  getQuery,
  removeDoc,
  makeBatch,
  getSnapshot,
  addDoc,
  updateBatch,
  deleteBatch,
  getFilterQuery,
} from "../../firebase";
import { push } from "connected-react-router";
import {
  deleteProductAction,
  fetchProductsAction,
  pageChangeAction,
  searchProductAction,
} from "./actions";

export const pageChange = (page) => {
  return async (dispatch) => {
    dispatch(pageChangeAction(page));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    removeDoc("products", id).then(() => {
      const prevProducts = getState().products.list;
      const nextProducts = prevProducts.filter((product) => product.id !== id);
      dispatch(deleteProductAction(nextProducts));
    });
  };
};

export const searchProduct = (keyword) => {
  return async (dispatch, getState) => {
    const prevProducts = getState().products.list;
    const searchedProducts = prevProducts.filter((product) =>
      product.name.includes(keyword)
    );
    dispatch(searchProductAction(searchedProducts));
  };
};

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    const productList = [];
    let query = getQuery(["products"], "update_at", "desc");
    if (gender !== "") {
      query = getFilterQuery(
        ["products"],
        "update_at",
        "desc",
        "gender",
        gender
      );
    }
    if (category !== "") {
      query = getFilterQuery(
        ["products"],
        "update_at",
        "desc",
        "category",
        category
      );
    }
    const snapshots = await getCollection(query);
    snapshots.forEach((snapshot) => {
      const product = snapshot.data();
      productList.push(product);
    });
    dispatch(fetchProductsAction(productList));
  };
};

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const timestamp = FirebaseTimestamp.now();

    let products = [],
      soldOutProducts = [];

    const batch = makeBatch();

    for (const product of productsInCart) {
      const snapshot = await getSnapshot(["products", product.productId]);
      const sizes = snapshot.data().sizes;

      const updateSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          } else {
            return {
              size: size.size,
              quantity: size.quantity - 1,
            };
          }
        } else {
          return size;
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      updateBatch(batch, ["products", product.productId], {
        sizes: updateSizes,
      });

      deleteBatch(batch, ["users", uid, "cart", product.cartId]);
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];
      alert(
        "申し訳ありません。" +
          errorMessage +
          "が在庫切れとなったため注文処理を中断しました。"
      );
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = getDocRef(["users", uid, "orders"]);
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          addDoc(["users", uid, "orders", orderRef.id], history);

          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert(
            "注文処理に失敗しました。通信状況を確認の上もう一度お試しください。"
          );
          return false;
        });
    }
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
    const timestamp = FirebaseTimestamp.now();

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
      const ref = getDocRef(["products"]);
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return updateDoc(["products", id], data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
