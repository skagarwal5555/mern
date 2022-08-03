import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCTS,
} from "../../constants/constants";

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
