import React from "react";
import { CategoryCard } from "./Category-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

export function CategoryAll() {
  let [categories, setCategories] = useState([]);

  const loadCategories = () => {
    axios
      .get("http://localhost:8081/api/v1/homepage/Allcategories")
      .then((res) => {
        console.log(res);
        console.log(res.data.categories);
        if (res.data.status === "success" && res.data.categories.length > 0) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await loadCategories();
    }
    fetchData();
  }, []);

  return (
    <Row className="d-flex justify-content-between w-50">
      {categories.map((category) => (
        <CategoryCard category={category}></CategoryCard>
      ))}
    </Row>
  );
}
