import {
  RESET_CHECKOUT,
  SET_CHECKOUT_SHIPPING_DETAILS,
} from "../../constants/constants";

export const setShippingDetails = (details) => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details,
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT,
});
