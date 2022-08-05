import * as type from "../../constants/constants";

export const signInSuccess = (auth, isAdmin) => ({
  type: type.SIGNIN_SUCCESS,
  payload: { acessToken: auth, isAdmin: isAdmin },
});

export const resetAuth = () => ({
  type: type.CLEAR_AUTH,
});

export const setAlertMessage = (message, msgType) => ({
  type: type.SET_ALERT,
  payload: {
    message: message,
    msgType: msgType,
  },
});
