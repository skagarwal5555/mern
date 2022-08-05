import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteProduct } from "../../redux/actions/productActions";
import { displayMoney } from "../../helpers/utils";

function AdminProductRow({ product }) {
  const navigate = useNavigate();
  const Token = useSelector((state) => state.auth.acessToken);
  const handleEditProduct = () => {
    navigate("/admin/products/" + product._id + "/edit");
  };
  const handleDeleteProduct = async () => {
    await DeleteProduct(product._id, Token);
  };
  return (
    <>
      <Row data-testid="manage-product-row">
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
              <span>Price {displayMoney(product.price)}</span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Button onClick={handleEditProduct} variant="link">
            Edit
          </Button>
          &nbsp;|&nbsp;
          <Button
            variant="link"
            style={{ color: "red" }}
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default AdminProductRow;
