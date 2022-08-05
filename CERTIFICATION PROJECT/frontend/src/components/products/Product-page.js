import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Products } from "./Products";
import { useSelector } from "react-redux";
import { addProductItemToCart } from "../../redux/actions/cartActions";
import { displayMoney } from "../../helpers/utils";
import * as routes from "../../constants/routes";

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
  const auth = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    loadProduct(product_id);
    loadRecommendedProducts();
  }, [product_id]);

  const loadProduct = async (productid) => {
    await axios
      .get(`http://localhost:8081/api/v1/products/${productid}`)
      .then((res) => {
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
        if (res.data.status === "success") {
          setRProducts(res.data.products.splice(0, 8));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = () => {
    addProductItemToCart(product, auth.acessToken, cartItems);
  };

  const buyNow = () => {
    addProductItemToCart(product, auth.acessToken, cartItems);
    navigate(routes.CHECKOUT);
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
              <img
                src={product.productImage}
                alt={product.name}
                width="200"
                height="200"
                style={{
                  border: "1px",
                  alignSelf: "center",
                }}
                className="mt-1 mb-1"
                data-testid="product-page-banner"
              ></img>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <div>
              <Button
                variant="light"
                type="button"
                disabled
                data-testid="product-price"
              >
                {displayMoney(product.price)}
              </Button>
            </div>
            <div
              className="ml-2"
              style={{ display: auth.isAdmin ? "none" : "block" }}
            >
              <Button
                variant="warning"
                type="button"
                onClick={buyNow}
                className="mr-2"
                data-testid="product-page-buynow"
              >
                Buy Now
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={addToCart}
                data-testid="product-page-add-to-cart"
              >
                Add to cart
              </Button>
            </div>
          </Col>
          <Col md={9}>{product.description}</Col>
        </Row>
        <br></br>
        <br></br>
        <Row className="ml-2">
          <Col md={12} className="pl-2 pr-2">
            <h6>Recommended Products</h6>
          </Col>
        </Row>
        <Row className="d-flex" style={rowStyle}>
          <Products
            products={rProducts}
            data-testid="homepage-product"
            width={"20%"}
          ></Products>
        </Row>
      </Container>
    </div>
  );
}
