import {
  RESET_CHECKOUT,
  SET_CHECKOUT_SHIPPING_DETAILS,
} from "../../constants/constants";

const defaultState = {
  shipping: {},
  payment: {
    type: "paypal",
    name: "",
    cardnumber: "",
    expiry: "",
    ccv: "",
  },
};

function checkoutReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload,
      };
    case RESET_CHECKOUT:
      return defaultState;
    default:
      return state;
  }
}

export default checkoutReducer;
