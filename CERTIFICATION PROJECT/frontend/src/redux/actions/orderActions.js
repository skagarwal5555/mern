import {
  SET_ORDERS,
  ADD_TO_ORDER,
  REMOVE_ORDER,
  CLEAR_ORDERS,
  UPDATE_ORDER,
} from "../../constants/constants";
import axios from "axios";
import store from "../store/store";

export const setOrders = (items = []) => ({
  type: SET_ORDERS,
  payload: items,
});

export const addToOrder = (orderItem) => ({
  type: ADD_TO_ORDER,
  payload: orderItem,
});

export const removeOrder = (id) => ({
  type: REMOVE_ORDER,
  payload: id,
});

export const clearOrder = () => ({
  type: CLEAR_ORDERS,
});

export const updateOrder = (id) => ({
  type: UPDATE_ORDER,
  payload: id,
});

export async function loadAllOrders(Token) {
  const config = {
    headers: { token: Token },
  };
  console.log(config);
  await axios
    .get("http://localhost:8081/api/v1/orders", config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(setOrders(res.data.orders));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateOrderStatus(acessToken, id) {
  const config = {
    headers: { token: acessToken },
  };

  await axios
    .patch("http://localhost:8081/api/v1/orders/", { id: id }, config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(updateOrder(id));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteOrder(acessToken, id) {
  const config = {
    headers: { token: acessToken },
  };

  await axios
    .delete("http://localhost:8081/api/v1/admin/orders/" + id, config)
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        store.dispatch(removeOrder(id));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
