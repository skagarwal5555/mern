import * as type from "../../constants/constants";

export const signInSuccess = (auth, isAdmin) => ({
  type: type.SIGNIN_SUCCESS,
  payload: { acessToken: auth, isAdmin: isAdmin },
});

export const signInFailure = (errorMessage) => ({
  type: type.SIGNIN_FAILURE,
  payload: { errorMessage: errorMessage },
});

export const signOut = () => ({
  type: type.SIGNOUT,
});

export const signOutSuccess = () => ({
  type: type.SIGNOUT_SUCCESS,
});

export const resetPassword = (email) => ({
  type: type.RESET_PASSWORD,
  payload: email,
});
