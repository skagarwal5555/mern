import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  addProductItemToCart,
  DecreaseRemoveProductFromCart,
} from "../../redux/actions/cartActions";
import { displayMoney } from "../../helpers/utils";

function CartRow({ p, showActions }) {
  const auth = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const handleRemoveProductFromCart = async () => {
    DecreaseRemoveProductFromCart(p.productId, 0, auth.acessToken, cartItems);
  };

  const handleAddQtyCart = async () => {
    addProductItemToCart(p.productId, auth.acessToken, cartItems);
  };

  const handleMinusQtyCart = async () => {
    DecreaseRemoveProductFromCart(
      p.productId,
      p.quantity - 1 > 0 ? -1 : 0,
      auth.acessToken,
      cartItems
    );
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
              <span>Price - {displayMoney(p.productId.price)}</span>
            </div>
            <div>
              <span>Discount - {displayMoney(p.productId.discountPrice)}</span>
            </div>
            <div>
              <span style={{ display: showActions ? "none" : "block" }}>
                Quantity - {p.quantity}
              </span>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div>
            {displayMoney(
              (p.productId.price - p.productId.discountPrice) * p.quantity
            )}
          </div>
        </Col>
      </Row>
      <Row className="mt-2" style={{ display: showActions ? "block" : "none" }}>
        <Col md={12}>
          <Button variant="secondary" onClick={handleMinusQtyCart}>
            -
          </Button>{" "}
          &nbsp; {p.quantity} &nbsp;
          <Button variant="secondary" onClick={handleAddQtyCart}>
            +
          </Button>{" "}
        </Col>
      </Row>
      <Row className="mt-3" style={{ display: showActions ? "block" : "none" }}>
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
