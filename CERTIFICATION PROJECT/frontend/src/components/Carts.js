import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import CartRow from "./CartRow";

export function Cart() {
  let [cart, setCart] = useState([]);
  let [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const Token = useSelector((state) => state.auth.acessToken);
  const loadUserCart = async () => {
    const config = {
      headers: { token: Token },
    };
    await axios
      .get("http://localhost:8081/api/v1/cart", config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          if (res.data.cart.length !== 0) {
            setCart(res.data.cart);
            calculateGrandTotal(res.data.cart);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadUserCart();
  }, []);

  const calculateGrandTotal = (cartInfo) => {
    let t = 0;
    cartInfo.items.forEach((p) => {
      t += (p.productId.price - p.productId.discountPrice) * p.quantity;
    });
    setTotal(t);
  };
  const checkout = function () {
    navigate("/checkout");
  };

  return (
    <Container className="w-50">
      <Row className="mb-5">
        <Col>
          <h2>Cart</h2>
        </Col>
      </Row>
      {cart !== undefined && cart.items !== undefined ? (
        cart.items.map((p) => <CartRow p={p}></CartRow>)
      ) : (
        <div>
          <strong>Cart is Empty</strong>
        </div>
      )}
      {cart !== undefined && cart.items !== undefined ? (
        <div>
          <Row className="justify-content-end">
            <Col style={{ alignItems: "end" }} className="col-4">
              <Button variant="light" type="button" disabled>
                Grand Total ${total}
              </Button>
              <br />
            </Col>
          </Row>
          <Row className="mb-5 justify-content-end">
            <Col style={{ alignItems: "end" }} className="col-3">
              <Button variant="primary" type="button" onClick={checkout}>
                Checkout
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
