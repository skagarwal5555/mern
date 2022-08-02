import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartRow from "./CartRow";

function OrderDetails() {
  const { id } = useParams();
  let state = useSelector((state) => state.auth);
  let [orderDetail, setOrderDetails] = useState({
    address: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
    cartId: {
      items: [],
    },
  });
  const loadOrderDetails = async () => {
    console.log(state);
    let config = {
      headers: { token: state.acessToken },
    };
    await axios
      .get(`http://localhost:8081/api/v1/orders/${id}`, config)
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res);
          setOrderDetails(res.data.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadOrderDetails();
  }, []);
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h2>Order Details</h2>
        </Col>
      </Row>
      {orderDetail.cartId.items.map((p) => (
        <CartRow p={p} showActions={false}></CartRow>
      ))}
      <div>
        <Row className="justify-content-end">
          <Col style={{ alignItems: "end" }} className="col-4">
            <Button variant="light" type="button" disabled>
              Grand Total $
              {orderDetail.cartId.items.reduce((accumulator, object) => {
                return (
                  accumulator +
                  (object.productId.price - object.productId.discountPrice) *
                    object.quantity
                );
              }, 0)}
            </Button>
            <br />
          </Col>
        </Row>
      </div>

      {orderDetail.address !== undefined ? (
        <div>
          <Row>
            <Col>
              <h2>Shipping Details</h2>
            </Col>
          </Row>
          <Row>
            <Col>Street Address</Col>
            <Col>{orderDetail.address.streetAddress}</Col>
          </Row>
          <Row>
            <Col>City</Col>
            <Col>{orderDetail.address.city}</Col>
          </Row>
          <Row>
            <Col>State</Col>
            <Col>{orderDetail.address.state}</Col>
          </Row>
          <Row>
            <Col>Zip Code</Col>
            <Col>{orderDetail.address.zipCode}</Col>
          </Row>{" "}
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}

export default OrderDetails;
