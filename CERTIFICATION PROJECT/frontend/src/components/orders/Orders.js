import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import { setOrders } from "../../redux/actions/orderActions";
import store from "../../redux/store/store";
import axios from "axios";

function Orders() {
  console.log(useSelector((state) => state));
  const Token = useSelector((state) => state.auth.acessToken);
  const orders = useSelector((state) => state.order);

  async function loadOrders() {
    const config = {
      headers: { token: Token },
    };
    console.log(config);
    await axios
      .get("http://localhost:8081/api/v1/orders", config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          //SetOrder(res.data.orders);
          store.dispatch(setOrders(res.data.orders));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function fetchData() {
      await loadOrders(Token);
    }
    fetchData();
  }, []);

  return (
    <Container className="w-50">
      <div className="mt-4 mb-5">
        <div>
          <strong>Your Orders</strong>
        </div>
      </div>
      {orders !== undefined && orders.length > 0 ? (
        orders.map((p) => <OrderRow order={p}></OrderRow>)
      ) : (
        <div>
          <strong>No Orders</strong>
        </div>
      )}
    </Container>
  );
}

export default Orders;
