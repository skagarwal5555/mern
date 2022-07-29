import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  profile: profileReducer,
  users: userReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
