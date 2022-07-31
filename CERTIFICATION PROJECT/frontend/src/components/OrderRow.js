import React from "react";
import { Row, Col } from "react-bootstrap";

function OrderRow({ order }) {
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
            <a>Details</a>
          </div>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default OrderRow;
