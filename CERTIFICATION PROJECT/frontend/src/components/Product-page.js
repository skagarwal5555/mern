import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Products } from "./Products";

const cardStyle = {
  borderRadius: "5px",
  margin: "10px",
};

const rowStyle = {
  padding: " 0 12px",
};

export function ProductPage() {
  const [product, setProduct] = useState({});
  const [rProducts, setRProducts] = useState([]);
  const { product_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
    loadRecommendedProducts();
  }, []);

  const loadProduct = async () => {
    await axios
      .get(`http://localhost:8081/api/v1/products/${product_id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setProduct(res.data.product);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadRecommendedProducts = async () => {
    await axios
      .get(`http://localhost:8081/api/v1/products`)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setRProducts(res.data.products.splice(0, 6));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = () => {
    let products = JSON.parse(localStorage.getItem("cart")) || [];
    products.push(product);
    localStorage.setItem("cart", JSON.stringify(products));
  };

  const buyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="w-60">
      <Container>
        <Row className="d-flex">
          <Col md={12}>
            <h4>{product.name}</h4>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card style={cardStyle}>
              <Card.Img
                variant="top"
                src={product.productImage}
                height="300"
                width="400"
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <div>
              <Button
                variant="light"
                type="button"
                disabled
                data-testid="cart-grand-total"
              >
                {product.price}
              </Button>
            </div>
            <div>
              <Button
                variant="warning"
                type="button"
                onClick={buyNow}
                className="mr-2"
              >
                Buy Now
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={addToCart}
                data-testid="cart-button"
              >
                Add to cart
              </Button>
            </div>
          </Col>
          <Col md={7}>{product.description}</Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col md={12} className="pl-2 pr-2">
            <h6>Recommended Products</h6>
          </Col>
        </Row>
        <Row className="d-flex" style={rowStyle}>
          <Products
            products={rProducts}
            data-testid="homepage-product"
            width={"30%"}
          ></Products>
        </Row>
      </Container>
    </div>
  );
}
