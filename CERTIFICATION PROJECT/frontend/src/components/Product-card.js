import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

let cardStyle = {
  borderRadius: "5px",
  margin: "10px",
  width: "20%",
  cursor: "pointer",
};

export function ProductCard({ product, width }) {
  const navigate = useNavigate();
  if (width === "30%") {
    cardStyle = {
      borderRadius: "5px",
      margin: "10px",
      width: "30%",
    };
  }
  const addToCart = () => {
    let products = JSON.parse(localStorage.getItem("cart")) || [];
    products.push(product);
    localStorage.setItem("cart", JSON.stringify(products));
  };

  const openProduct = (id) => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card style={cardStyle} onClick={openProduct}>
      <Badge
        pill
        bg="success"
        style={{ display: product.isTopProduct === true ? "block" : "none" }}
      >
        #1 in {product.category.name}
      </Badge>{" "}
      <Card.Img variant="top" src={product.productImage} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <div className="mt-auto">
          <Button className="mt-auto" variant="light" type="button" disabled>
            {product.price || 0}
          </Button>
          <Button variant="primary" type="button" onClick={addToCart}>
            Add to cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
