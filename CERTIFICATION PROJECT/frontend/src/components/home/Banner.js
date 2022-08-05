import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Banner({ banner }) {
  const navigate = useNavigate();
  const handleBannerClick = (product, event) => {
    event.preventDefault();
    navigate("/products/" + product._id);
  };
  return (
    <Carousel style={{ borderRadius: "5px", margin: "10px" }} variant="dark">
      {banner.map((product) => (
        <Carousel.Item>
          <img
            className="w-100"
            src={product.productImage}
            alt={product.name}
            style={{ cursor: "pointer" }}
            onClick={(event) => handleBannerClick(product, event)}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
