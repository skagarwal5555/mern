import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const cardStyle = {
  borderRadius: "5px",
  margin: "10px",
  width: "30%",
  height: "150px",
  textAlign: "center",
  backgroundColor: "#fdfd",
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
        <Card.Text>{category.name}</Card.Text>
      </Card.Body>
    </Card>
  );
}