import { Card, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { addProductItemToCart } from "../../redux/actions/cartActions";
import { displayMoney } from "../../helpers/utils";
import { setAlertMessage } from "../../redux/actions/authActions";
import store from "../../redux/store/store";

let cardStyle = {
  borderRadius: "5px",
  margin: "20px",
  width: "20%",
  cursor: "pointer",
  border: "1px solid black",
};

export function ProductCard({ product, width }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

  if (width === "40%") {
    cardStyle = {
      borderRadius: "20px",
      margin: "10px",
      width: "40%",
      cursor: "pointer",
    };
  } else {
    cardStyle = {
      borderRadius: "5px",
      margin: "20px",
      width: "20%",
      cursor: "pointer",
      border: "1px solid black",
    };
  }
  const addProductToCart = async () => {
    addProductItemToCart(product, auth.acessToken, cartItems);
    store.dispatch(setAlertMessage("Product added to cart", "success"));
  };

  const openProduct = (id) => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card style={cardStyle}>
      <Badge
        pill
        bg="success"
        style={{ display: product.isTopProduct ? "block" : "none" }}
        className="mt-1"
      >
        #1 in {product.category.name}
      </Badge>{" "}
      <Card.Img
        className={product.isTopProduct ? "mt-1" : "mt-4"}
        variant="top"
        src={product.productImage}
        onClick={openProduct}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="truncate" style={{ minHeight: "20px" }}>
          {product.description}
        </Card.Text>
        <div className="mt-auto">
          <Row>
            <Col md="4" style={{ paddingLeft: "0px" }}>
              <Button
                className="mt-auto"
                variant="light"
                type="button"
                disabled
              >
                {displayMoney(product.price || 0)}
              </Button>
            </Col>
            <Col md="8" style={{ paddingRight: "0px", paddingLeft: "35px" }}>
              <Button
                variant="primary"
                type="button"
                onClick={addProductToCart}
                style={{
                  display:
                    auth !== undefined && auth.isAdmin ? "none" : "block",
                }}
              >
                Add to cart
              </Button>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
