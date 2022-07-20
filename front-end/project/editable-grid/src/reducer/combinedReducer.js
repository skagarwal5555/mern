import { combineReducers } from "redux";
import tableInfo from "./userInfoReducer";

const rootReducer = combineReducers({
  tableInfo,
});

export default rootReducer;
