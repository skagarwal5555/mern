import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function CategoryCard(props) {
  const navigate = useNavigate();
  let category = props.category;
  let categoryId = props.category._id;
  const handleOnClick = () => {
    navigate("/categories/" + categoryId);
  };

  return (
    <Card className="categoryCard" onClick={handleOnClick}>
      <Card.Body>
        <Card.Text className="mt-4">{category.name}</Card.Text>
        <Button variant="link">Shop Now</Button>
      </Card.Body>
    </Card>
  );
}
