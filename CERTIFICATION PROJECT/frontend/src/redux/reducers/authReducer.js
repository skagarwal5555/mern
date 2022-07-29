import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from "../../constants/constants";

const initialState = {
  acessToken: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      console.log("payload" + action.payload);
      return {
        acessToken: action.payload,
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

export default authReducer;
