import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Products } from "./Products";
import productFilters from "../static/productFilters.json";
const rowStyle = {
  padding: " 0 12px",
};

export function CategoryProducts(props) {
  const { catergory_id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
      if (newFilter instanceof Array) {
        newFilter = newFilter;
      } else {
        newFilter = [newFilter];
      }
      setFilteredProducts(newFilter);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Row className="w-75 d-flex justify-content-between">
      <Col md={3} className="mt-4">
        <Row>
          <strong>Price Range</strong>
        </Row>
        <ul>
          {productFilters.map((item) => (
            <li onClick={handleFilterClick.bind(this, item.desc)}>
              {item.desc}
            </li>
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
            width={"30%"}
          ></Products>
        </Row>
      </Col>
    </Row>
  );
}
