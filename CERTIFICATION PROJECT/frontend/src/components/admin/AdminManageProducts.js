import React from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AdminProductRow from "./AdminProductRow";
import { setProducts } from "../../redux/actions/productActions";
import store from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

function AdminManageProducts() {
  const navigate = useNavigate();
  const Token = useSelector((state) => state.auth.acessToken);
  const products = useSelector((state) => state.products);

  const loadAllProducts = async () => {
    const config = {
      headers: { token: Token },
    };
    await axios
      .get("http://localhost:8081/api/v1/products", config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          store.dispatch(setProducts(res.data.products));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (products === undefined || products.length === 0) {
      loadAllProducts();
    }
  }, []);

  const handleAddNewProductClick = () => {
    navigate("/admin/add-new-product");
  };
  return (
    <Container className="w-50">
      <div className="mt-4 mb-5">
        <div>
          <strong>Manage Products</strong> &nbsp;
          <Button onClick={handleAddNewProductClick}>Add new Product</Button>
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
