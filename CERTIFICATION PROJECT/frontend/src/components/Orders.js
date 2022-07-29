import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Orders() {
  const Token = useSelector((state) => state.auth.acessToken);
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
      <div className="mt-4">
        <div>
          <strong>Your Orders</strong>
        </div>
      </div>
    </Container>
  );
}

export default Orders;
