import { combineReducers } from "redux";
import courses from "./courseReducer";
import enquiries from "./enquiryReducer";

const rootReducer = combineReducers({
  courses,
  enquiries,
});

export default rootReducer;
