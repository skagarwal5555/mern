import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../products/Products";
import productFilters from "../../static/productFilters.json";
const rowStyle = {
  padding: " 0 12px",
};

export function CategoryProducts(props) {
  const { catergory_id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  console.log(productFilters);
  const loadProducts = async () => {
    await axios
      .get(`http://localhost:8081/api/v1/category/${catergory_id}`)
      .then((res) => {
        console.log(res);
        setProducts(res.data.product);
        setFilteredProducts(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item href="#" onClick={handleHomeClick}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Products</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="w-75 d-flex justify-content-between">
        <Col md={3} className="mt-4">
          <Row>
            <strong>Price Range</strong>
          </Row>
          <ul>
            {productFilters.map((item) => (
              <ProductFilter
                priceRange={item}
                products={products}
                setFilteredProducts={setFilteredProducts}
              ></ProductFilter>
            ))}
          </ul>
        </Col>
        <Col md={9}>
          <Row>
            {[products.length] > 0 ? (
              <strong>{products[0].category.name}</strong>
            ) : (
              <strong>No Products Found</strong>
            )}
          </Row>
          <Row className="d-flex" style={rowStyle}>
            <Products
              products={filteredProducts}
              data-testid="homepage-product"
              width={"40%"}
            ></Products>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export function ProductFilter({ products, priceRange, setFilteredProducts }) {
  let [selectedRange, setSelectedRange] = useState("");

  const handleFilterClick = (id) => {
    let filterRow = productFilters.find((item) => item.desc === id);
    let minVal = filterRow.minVal;
    let maxVal = filterRow.maxVal;

    let newFilter = products.find(
      (item) => item.price >= minVal && item.price < maxVal
    );

    if (newFilter === undefined) {
      setFilteredProducts([]);
    } else {
      if (!(newFilter instanceof Array)) {
        newFilter = [newFilter];
      }
      setFilteredProducts(newFilter);
    }
    setSelectedRange(id);
  };
  return (
    <li
      onClick={handleFilterClick.bind(this, priceRange.desc)}
      className={selectedRange === priceRange.desc ? "active" : ""}
      style={{ cursor: "pointer" }}
    >
      {priceRange.desc}
    </li>
  );
}
