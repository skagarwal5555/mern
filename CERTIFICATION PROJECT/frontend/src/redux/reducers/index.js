import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
import orderReducer from "./orderReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  profile: profileReducer,
  order: orderReducer,
});

export default rootReducer;
