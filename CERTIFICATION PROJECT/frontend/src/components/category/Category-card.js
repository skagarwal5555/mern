import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const cardStyle = {
  borderRadius: "5px",
  margin: "10px",
  width: "30%",
  height: "150px",
  textAlign: "center",
  cursor: "pointer",
  border: "1px solid black",
};

export function CategoryCard(props) {
  const navigate = useNavigate();
  let category = props.category;
  let categoryId = props.category._id;
  const handleOnClick = () => {
    navigate("/categories/" + categoryId);
  };

  return (
    <Card style={cardStyle} onClick={handleOnClick}>
      <Card.Body>
        <Card.Text className="mt-4">{category.name}</Card.Text>
        <Button variant="link">Shop Now</Button>
      </Card.Body>
    </Card>
  );
}
