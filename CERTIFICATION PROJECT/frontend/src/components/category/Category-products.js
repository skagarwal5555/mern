import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Container, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../products/Products";
import productFilters from "../../static/productFilters.json";
import * as routes from "../../constants/routes";
import { displayMoney } from "../../helpers/utils";
const rowStyle = {
  padding: " 0 12px",
};

export function CategoryProducts(props) {
  const { catergory_id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let [selectedRange, setSelectedRange] = useState("");
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
    navigate(routes.HOME);
  };
  const handleReset = () => {
    setFilteredProducts(products);
    setSelectedRange(0);
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
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              ></ProductFilter>
            ))}
          </ul>
          <Button variant="link" onClick={handleReset}>
            Reset
          </Button>
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

export function ProductFilter({
  products,
  priceRange,
  setFilteredProducts,
  selectedRange,
  setSelectedRange,
}) {
  console.log(selectedRange);
  const handleFilterClick = (id) => {
    let filterRow = productFilters.find((item) => item.id === id);
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
      onClick={handleFilterClick.bind(this, priceRange.id)}
      className={selectedRange === priceRange.id ? "filterActive" : ""}
      style={{ cursor: "pointer" }}
    >
      {displayMoney(priceRange.minVal)}&nbsp;-&nbsp;
      {displayMoney(priceRange.maxVal)}
    </li>
  );
}
