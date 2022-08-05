import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from "../../constants/constants";

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

export const setProfile = (user) => ({
  type: SET_PROFILE,
  payload: user,
});

export const updateProfileSuccess = (updates) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates,
});
