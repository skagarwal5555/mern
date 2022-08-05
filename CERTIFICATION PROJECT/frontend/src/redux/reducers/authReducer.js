import {
  SIGNIN_SUCCESS,
  CLEAR_AUTH,
  SET_ALERT,
} from "../../constants/constants";

const initialState = {
  acessToken: "",
  isAdmin: "",
  message: "",
  msgType: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        acessToken: action.payload.acessToken,
        isAdmin: action.payload.isAdmin,
        message: "",
        msgType: "",
      };
    case CLEAR_AUTH:
      return initialState;
    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        msgType: action.payload.msgType,
      };
    default:
      return state;
  }
}

export default authReducer;
