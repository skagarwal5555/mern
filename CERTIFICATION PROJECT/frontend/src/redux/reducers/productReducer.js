import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCTS,
} from "../../constants/constants";

function productReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    case ADD_PRODUCT:
      return [action.payload, ...state];
    case REMOVE_PRODUCT:
      return state.filter((item) => item._id !== action.payload);
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
    default:
      return state;
  }
}

export default productReducer;
