import { Carousel } from "react-bootstrap";

const cardStyle = {
  borderRadius: "5px",
  margin: "10px",
};

export function Banner({ banner }) {
  return (
    <Carousel style={cardStyle} variant="dark">
      {banner.map((product) => (
        <Carousel.Item>
          <img
            className="w-100"
            src={product.productImage}
            alt={product.name}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
