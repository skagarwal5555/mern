import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

function Orders() {
  const Token = useSelector((state) => state.auth.acessToken);
  let [orders, SetOrder] = useState([]);
  console.log(Token);
  const loadUserOrders = async () => {
    const config = {
      headers: { token: Token },
    };
    console.log(config);
    await axios
      .get("http://localhost:8081/api/v1/orders", config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          SetOrder(res.data.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadUserOrders();
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
