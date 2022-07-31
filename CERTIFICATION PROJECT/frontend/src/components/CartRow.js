import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

function CartRow({ p }) {
  const Token = useSelector((state) => state.auth.acessToken);
  const handleRemoveProductFromCart = async () => {
    const config = {
      headers: { token: Token },
    };
    const data = {
      productId: p.productId._id,
      quantity: 0,
    };
    await axios
      .post("http://localhost:8081/api/v1/cart", data, config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          if (res.data.cart.length !== 0) {
            //update cart
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddQtyCart = async () => {
    const config = {
      headers: { token: Token },
    };
    const data = {
      productId: p.productId._id,
      quantity: 1,
    };
    await axios
      .post("http://localhost:8081/api/v1/cart", data, config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          if (res.data.cart.length !== 0) {
            //update cart
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMinusQtyCart = async () => {
    const config = {
      headers: { token: Token },
    };
    const data = {
      productId: p.productId._id,
      quantity: p.quantity - 1 > 0 ? -1 : 0,
    };
    await axios
      .post("http://localhost:8081/api/v1/cart", data, config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          if (res.data.cart.length !== 0) {
            //update cart
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Row>
        <Col md={2}>
          <img
            src={p.productId.productImage}
            alt={p.productId.name}
            width="100"
            height="100"
            style={{ border: "1px" }}
          ></img>
        </Col>
        <Col md={8}>
          <div>
            <div>
              <span>{p.productId.name}</span>
            </div>
            <div>
              <span>Price ${p.productId.price}</span>
            </div>
            <div>
              <span>Discount {p.productId.discountPrice}</span>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div>
            ${(p.productId.price - p.productId.discountPrice) * p.quantity}
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={12}>
          <Button variant="secondary" onClick={handleMinusQtyCart}>
            -
          </Button>{" "}
          &nbsp; {p.quantity} &nbsp;
          <Button variant="secondary" onClick={handleMinusQtyCart}>
            +
          </Button>{" "}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Button variant="danger" onClick={handleRemoveProductFromCart}>
            Remove
          </Button>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default CartRow;
