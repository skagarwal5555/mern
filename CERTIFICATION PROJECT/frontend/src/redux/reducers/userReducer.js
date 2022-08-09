import {
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
  SET_USERS,
} from "../../constants/constants";

function userReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    case ADD_USER:
      return [action.payload, ...state];
    case REMOVE_USER:
      return state.filter((item) => item._id !== action.payload);
    case EDIT_USER:
      return state.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      });
    default:
      return state;
  }
}

export default userReducer;
