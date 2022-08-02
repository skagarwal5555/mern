import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import CartRow from "./CartRow";

export function Cart() {
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const navigate = useNavigate();

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
      {cartItems !== undefined && cartItems.length > 0 ? (
        cartItems.map((p) => <CartRow p={p} showActions={true}></CartRow>)
      ) : (
        <div>
          <strong>Cart is Empty</strong>
        </div>
      )}
      {cartItems !== undefined && cartItems.length > 0 ? (
        <div>
          <Row className="justify-content-end">
            <Col style={{ alignItems: "end" }} className="col-4">
              <Button variant="light" type="button" disabled>
                Grand Total $
                {cartItems.reduce((accumulator, object) => {
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
