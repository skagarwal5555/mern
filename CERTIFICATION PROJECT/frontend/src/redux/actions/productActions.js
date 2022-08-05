import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCTS,
} from "../../constants/constants";
import axios from "axios";
import store from "../store/store";
import { setAlertMessage } from "./authActions";

export const setProducts = (items = []) => ({
  type: SET_PRODUCTS,
  payload: items,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});

export async function UpdateProduct(Token, product) {
  const config = {
    headers: { token: Token },
  };

  if (product._id !== undefined) {
    await axios
      .patch("http://localhost:8081/api/v1/admin/products", product, config)
      .then((res) => {
        if (res.data.status === "success") {
          store.dispatch(editProduct(product));
          store.dispatch(
            setAlertMessage("Product updated successfully", "success")
          );
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(setAlertMessage("Product update failed", "failure"));
      });
  } else {
    await axios
      .post("http://localhost:8081/api/v1/admin/products", product, config)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          store.dispatch(addProduct(res.data.data));
          store.dispatch(
            setAlertMessage("Product created successfully", "success")
          );
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(setAlertMessage("Product creation failed", "failed"));
      });
  }
}

export async function AllProducts(Token) {
  const config = {
    headers: { token: Token },
  };
  await axios
    .get("http://localhost:8081/api/v1/products", config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(setProducts(res.data.products));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function DeleteProduct(id, Token) {
  const config = {
    headers: { token: Token },
  };

  await axios
    .delete("http://localhost:8081/api/v1/admin/products/" + id, config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(removeProduct(id));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
