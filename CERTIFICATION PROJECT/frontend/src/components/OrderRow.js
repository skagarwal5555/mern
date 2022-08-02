import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OrderRow({ order }) {
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate("/orders/" + order._id);
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <div>
            <div>
              <span>#{order.orderNumber}</span>
            </div>
            <div>
              <span>{order.email}</span>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div>
            <Button variant="link" onClick={handleDetailsClick}>
              Details
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default OrderRow;
