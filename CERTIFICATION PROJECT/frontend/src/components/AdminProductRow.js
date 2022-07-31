import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminProductRow({ product }) {
  const navigate = useNavigate();
  const Token = useSelector((state) => state.auth.acessToken);
  const handleEditProduct = () => {
    navigate("/admin/products/" + product._id + "/edit");
  };
  const handleDeleteProduct = async () => {
    const config = {
      headers: { token: Token },
    };

    await axios
      .delete(
        "http://localhost:8081/api/v1/admin/products/" + product._id,
        config
      )
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
            src={product.productImage}
            alt={product.name}
            width="100"
            height="100"
            style={{ border: "1px" }}
          ></img>
        </Col>
        <Col md={6}>
          <div>
            <div>
              <span>#{product.name}</span>
            </div>
            <div>
              <span>Price ${product.price}</span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Button onClick={handleEditProduct}>Edit</Button>&nbsp;|&nbsp;
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default AdminProductRow;