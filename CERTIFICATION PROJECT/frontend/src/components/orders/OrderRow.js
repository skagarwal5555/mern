import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteOrder,
  updateOrderStatus,
} from "../../redux/actions/orderActions";

function OrderRow({ order }) {
  let auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/orders/" + order._id);
  };

  const handleProcessClick = async () => {
    await updateOrderStatus(auth.acessToken, order._id);
  };

  const handleDeleteClick = async () => {
    await deleteOrder(auth.acessToken, order._id);
  };

  return (
    <>
      <Row data-testid={auth.isAdmin ? "manage-order-row" : "order-row"}>
        <Col md={8}>
          <div>
            <div>
              <span style={{ color: order.isDelivered ? "green" : "black" }}>
                #{order.orderNumber}
              </span>
            </div>
            <div>
              <span>{order.email}</span>
            </div>
          </div>
        </Col>
        <Col md={2} style={{ display: auth.isAdmin ? "none" : "block" }}>
          <div>
            <Button variant="link" onClick={handleDetailsClick}>
              Details
            </Button>
          </div>
        </Col>
        <Col style={{ display: auth.isAdmin ? "block" : "none" }} md={4}>
          <Row>
            <Button
              variant="link"
              onClick={handleProcessClick}
              style={{
                display: order.isDelivered ? "none" : "block",
              }}
            >
              Process
            </Button>
            <div
              className="btn"
              style={{
                display: order.isDelivered ? "none" : "block",
              }}
            >
              |
            </div>
            <Button
              variant="link"
              onClick={handleDeleteClick}
              style={{ color: "red" }}
            >
              Delete
            </Button>
          </Row>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default OrderRow;
