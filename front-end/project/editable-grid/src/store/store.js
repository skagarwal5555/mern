import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/combinedReducer";
import thunk from "redux-thunk";
import promise from "redux-promise";

//The created store
export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(thunk)
      .concat(promise),
});
