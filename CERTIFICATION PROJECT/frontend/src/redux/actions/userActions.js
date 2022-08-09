import {
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
  SET_USERS,
} from "../../constants/constants";
import axios from "axios";
import store from "../store/store";
import { setAlertMessage } from "./authActions";

export const setUsers = (items = []) => ({
  type: SET_USERS,
  payload: items,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const removeUser = (id) => ({
  type: REMOVE_USER,
  payload: id,
});

export const editUser = (user) => ({
  type: EDIT_USER,
  payload: user,
});

export async function AllUsers(Token) {
  const config = {
    headers: { token: Token },
  };
  await axios
    .get("http://localhost:8081/api/v1/admin/users/", config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(setUsers(res.data.users));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function DeleteUser(id, Token) {
  const config = {
    headers: { token: Token },
  };

  await axios
    .delete("http://localhost:8081/api/v1/admin/users/" + id, config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(removeUser(id));
        store.dispatch(setAlertMessage("User successfully deleted", "success"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function AddUpdateUser(Token, user) {
  const config = {
    headers: { token: Token },
  };

  if (user._id !== undefined) {
    await axios
      .patch("http://localhost:8081/api/v1/admin/users/", user, config)
      .then((res) => {
        if (res.data.status === "success") {
          store.dispatch(editUser(user));
          store.dispatch(
            setAlertMessage("User updated successfully", "success")
          );
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(setAlertMessage("User update failed", "failure"));
      });
  } else {
    //set default password as email
    user.password = user.email;
    await axios
      .post("http://localhost:8081/api/v1/admin/users/addUser", user, config)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          store.dispatch(addUser(res.data.user));
          store.dispatch(
            setAlertMessage("User created successfully", "success")
          );
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(setAlertMessage("User creation failed", "failed"));
      });
  }
}
