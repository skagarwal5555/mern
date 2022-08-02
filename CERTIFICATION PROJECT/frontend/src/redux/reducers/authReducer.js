import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from "../../constants/constants";

const initialState = {
  acessToken: "",
  isAdmin: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        acessToken: action.payload.acessToken,
        isAdmin: action.payload.isAdmin,
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

export default authReducer;
