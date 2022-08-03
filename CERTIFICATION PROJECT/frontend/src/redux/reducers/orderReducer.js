import {
  SET_ORDERS,
  ADD_TO_ORDER,
  REMOVE_ORDER,
  CLEAR_ORDERS,
  UPDATE_ORDER,
} from "../../constants/constants";

function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;
    case ADD_TO_ORDER:
      return [action.payload, ...state];
    case REMOVE_ORDER:
      return state.filter((item) => item._id !== action.payload);
    case CLEAR_ORDERS:
      return [];
    case UPDATE_ORDER:
      return state.map((order) => {
        if (order._id === action.payload) {
          return {
            ...order,
            isDelivered: true,
          };
        }
        return order;
      });
    default:
      return state;
  }
}

export default orderReducer;
