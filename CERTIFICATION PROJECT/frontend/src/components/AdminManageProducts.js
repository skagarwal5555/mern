import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdminProductRow from "./AdminProductRow";

function AdminManageProducts() {
  const Token = useSelector((state) => state.auth.acessToken);
  let [products, SetOrder] = useState([]);
  const loadAllProducts = async () => {
    const config = {
      headers: { token: Token },
    };
    await axios
      .get("http://localhost:8081/api/v1/products", config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          SetOrder(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Container className="w-50">
      <div className="mt-4 mb-5">
        <div>
          <strong>Manage Products</strong>
        </div>
      </div>
      {products !== undefined && products.length > 0 ? (
        products.map((p) => <AdminProductRow product={p}></AdminProductRow>)
      ) : (
        <div>
          <strong>No Products to display</strong>
        </div>
      )}
    </Container>
  );
}

export default AdminManageProducts;
