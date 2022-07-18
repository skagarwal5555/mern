import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/combineReducer";
import thunk from "redux-thunk";
import promise from "redux-promise";
import initialState from "../reducer/initialState";
//The created store
export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(thunk)
      .concat(promise),
});
