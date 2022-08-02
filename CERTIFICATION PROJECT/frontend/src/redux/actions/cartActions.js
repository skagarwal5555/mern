import {
  ADD_QTY_ITEM,
  ADD_TO_CART,
  CLEAR_CART,
  MINUS_QTY_ITEM,
  REMOVE_FROM_CART,
  SET_CART_ITEMS,
} from "../../constants/constants";
import axios from "axios";
import store from "../store/store";

export const setCartItems = (items = []) => ({
  type: SET_CART_ITEMS,
  payload: items,
});

export const addToCart = (productItem) => ({
  type: ADD_TO_CART,
  payload: productItem,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const addQtyItem = (id) => ({
  type: ADD_QTY_ITEM,
  payload: id,
});

export const minusQtyItem = (id) => ({
  type: MINUS_QTY_ITEM,
  payload: id,
});

export async function addProductItemToCart(product, token, cartItems) {
  let newCartItem = {
    productId: product,
    quantity: 1,
  };
  const config = {
    headers: { token: token },
  };

  if (token !== undefined && token.length > 0) {
    await axios
      .post(
        "http://localhost:8081/api/v1/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //check if cart is empty or undefined
  if (cartItems === undefined || cartItems.length === 0) {
    //if cart is empty set items in cart
    store.dispatch(setCartItems([newCartItem]));
  } else {
    console.log(cartItems);
    //check if the product exists in cart
    let item = cartItems.find((item) => item.productId._id === product._id);
    console.log(item);
    //if product does exist increase qunatity
    if (item !== undefined) {
      console.log("product exist , increasing qty");
      //increase quantity
      store.dispatch(addQtyItem(product._id));
    } else {
      //if product does not exist add item to cart
      console.log("new product adding to cart");
      store.dispatch(addToCart(newCartItem));
    }
  }
}

export async function DecreaseRemoveProductFromCart(
  product,
  quantity,
  token,
  cartItems
) {
  const config = {
    headers: { token: token },
  };

  if (token !== undefined && token.length > 0) {
    await axios
      .post(
        "http://localhost:8081/api/v1/cart",
        {
          productId: product._id,
          quantity: quantity,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //check if cart is empty or undefined
  if (cartItems !== undefined && cartItems.length > 0) {
    console.log(cartItems);
    //check if the product exists in cart
    let item = cartItems.find((item) => item.productId._id === product._id);
    console.log(item);
    //if product does exist increase qunatity
    if (item !== undefined) {
      console.log("product exist");
      if (quantity === -1) {
        //decrese quantity
        store.dispatch(minusQtyItem(product._id));
      }
      if (quantity === 0) {
        store.dispatch(removeFromCart(product._id));
      }
    }
  }
}
