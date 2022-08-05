import React from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AdminProductRow from "./AdminProductRow";
import { AllProducts } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";

function AdminManageProducts() {
  const navigate = useNavigate();
  const Token = useSelector((state) => state.auth.acessToken);
  const products = useSelector((state) => state.products);

  const loadAllProducts = async () => {
    await AllProducts(Token);
  };

  useEffect(() => {
    if (products === undefined || products.length === 0) {
      loadAllProducts();
    }
  }, []);

  const handleAddNewProductClick = () => {
    navigate(routes.ADD_PRODUCT);
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
