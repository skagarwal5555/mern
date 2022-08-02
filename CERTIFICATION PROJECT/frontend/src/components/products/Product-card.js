import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { addProductItemToCart } from "../../redux/actions/cartActions";

let cardStyle = {
  borderRadius: "5px",
  margin: "10px",
  width: "20%",
  cursor: "pointer",
};

export function ProductCard({ product, width }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

  if (width === "30%") {
    cardStyle = {
      borderRadius: "5px",
      margin: "10px",
      width: "30%",
    };
  }
  const addProductToCart = async () => {
    addProductItemToCart(product, auth.acessToken, cartItems);
  };

  const openProduct = (id) => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card style={cardStyle}>
      <Badge
        pill
        bg="success"
        style={{ display: product.isTopProduct === true ? "block" : "none" }}
      >
        #1 in {product.category.name}
      </Badge>{" "}
      <Card.Img
        className="mt-1"
        variant="top"
        src={product.productImage}
        onClick={openProduct}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <div className="mt-auto">
          <Button className="mt-auto" variant="light" type="button" disabled>
            ${product.price || 0}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={addProductToCart}
            style={{
              display: auth !== undefined && auth.isAdmin ? "none" : "block",
            }}
          >
            Add to cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
