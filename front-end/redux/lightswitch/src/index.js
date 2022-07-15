import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, connect } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

const initialState = {
  isLightOn: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FLIP":
      return {
        ...state,
        isLightOn: !state.isLightOn,
      };
    default:
      return state;
  }
}

//The created store
const store = configureStore({ reducer: reducer });
console.log(store.getState());

function Room() {
  const flipLight = () => {
    store.dispatch({ type: "FLIP" });
  };

  const isLightOn = isLightOn ? "On" : "Off";
  return (
    <div className="App">
      the light in room is {isLightOn}
      <br />
      <button onClick={flipLight}>flip</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLightOn: state.isLightOn,
});

const ConnectedRoom = connect(mapStateToProps)(Room);

root.render(
  <Provider store={store}>
    <ConnectedRoom />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
