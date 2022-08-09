import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  profile: profileReducer,
  order: orderReducer,
  users: userReducer,
});

export default rootReducer;
