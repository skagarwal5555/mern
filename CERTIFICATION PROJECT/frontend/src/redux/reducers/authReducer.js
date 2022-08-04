import { SIGNIN_SUCCESS, CLEAR_AUTH } from "../../constants/constants";

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
    case CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
