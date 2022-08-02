import { Products } from "../products/Products";
import { Banner } from "./Banner";
import { Row, Col } from "react-bootstrap";
import { CategoryCard } from "../category/Category-card";
import axios from "axios";
import { useEffect, useState } from "react";

const rowStyle = {
  padding: " 0 12px",
};

export function Home() {
  let [myProducts, setMyProducts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [banner, setBanner] = useState([]);

  const loadCategories = () => {
    axios
      .get("http://localhost:8081/api/v1/homepage/categories")
      .then((res) => {
        if (res.data.status === "success" && res.data.categories.length > 0) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTopProducts = async () => {
    await axios
      .get(" http://localhost:8081/api/v1/homepage/products")
      .then((res) => {
        if (res.data.status === "success" && res.data.products.length > 0) {
          setMyProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBanner = async () => {
    await axios
      .get(" http://localhost:8081/api/v1/homepage/banner")
      .then((res) => {
        if (res.data.status === "success" && res.data.products.length > 0) {
          setBanner(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await loadCategories();
      await loadTopProducts();
      await loadBanner();
    }
    fetchData();
  }, []);

  return (
    <div className="w-75">
      <Row>
        <Col md={12}>
          <Banner data-testid="homepage-banner" banner={banner}></Banner>
        </Col>
        <Col
          md={12}
          className="d-flex justify-content-between"
          data-testid="homepage-category"
        >
          {categories.map((category) => (
            <CategoryCard category={category}></CategoryCard>
          ))}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {" "}
          <h3>Top Products</h3>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between" style={rowStyle}>
        <Products
          products={myProducts}
          data-testid="homepage-product"
          width={"20%"}
        ></Products>
      </Row>
    </div>
  );
}
