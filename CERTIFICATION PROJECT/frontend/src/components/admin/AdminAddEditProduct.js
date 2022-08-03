import React from "react";
import { Container, Form, Button, Breadcrumb } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "../../redux/store/store";
import { addProduct, editProduct } from "../../redux/actions/productActions";

function AdminAddEditProduct() {
  const navigate = useNavigate();
  let { product_id } = useParams();
  let Token = useSelector((state) => state.auth.acessToken);

  const objProduct = useSelector((state) =>
    state.products.find((item) => item._id === product_id)
  );

  let [isSuccess, setisSuccess] = useState("");
  let [isFailure, setisFailure] = useState("");

  let [product, setProduct] = useState(
    objProduct !== undefined
      ? objProduct
      : {
          name: "",
          price: "",
          description: "",
          productImage: "",
          discountPrice: "",
          category: {
            name: "",
          },
        }
  );

  const handleChange = (e) => {
    if (e.target.name === "category.name") {
      setProduct((prevState) => ({
        ...prevState,
        category: {
          ...prevState.category,
          name: e.target.value,
        },
      }));
    } else if (e.target.name === "isTopProduct") {
      setProduct((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const config = {
      headers: { token: Token },
    };

    if (product._id !== undefined) {
      await axios
        .patch("http://localhost:8081/api/v1/admin/products", product, config)
        .then((res) => {
          if (res.data.status === "success") {
            store.dispatch(editProduct(product));
            setisSuccess("Product Updated Successfully");
            setisFailure("");
          }
        })
        .catch((err) => {
          console.log(err);
          setisFailure("Product Updated Failed");
          setisSuccess("");
        });
    } else {
      await axios
        .post("http://localhost:8081/api/v1/admin/products", product, config)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            store.dispatch(addProduct(res.data.data));
            setisSuccess("Product created Successfully");
            setisFailure("");
          }
        })
        .catch((err) => {
          console.log(err);
          setisFailure("Product creation Failed");
          setisSuccess("");
        });
    }
  };

  const handleManageProductsClick = () => {
    navigate("/admin/products");
  };
  return (
    <Container className="w-50">
      <div className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="#" onClick={handleManageProductsClick}>
            Manage Products
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Product</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="bg-success mb-2"
          style={{
            textAlign: "center",
            display: isSuccess.length > 0 ? "block" : "none",
          }}
        >
          {isSuccess}
        </div>
        <div
          className="bg-danger mb-2"
          style={{
            textAlign: "center",
            display: isFailure.length > 0 ? "block" : "none",
          }}
        >
          {isFailure}
        </div>
        <div>
          {product_id !== undefined && product_id.length > 0 && (
            <strong>Edit Product</strong>
          )}
          {product_id === undefined && <strong>Add new Product</strong>}
        </div>
        <Form onSubmit={handleUpdateProduct}>
          <Form.Group className="mb-3 mt-3" controlId="formBasicProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              required
              value={product.name}
              onChange={handleChange}
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Category"
              required
              value={[product.category.name]}
              onChange={handleChange}
              name="category.name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              required
              value={product.price}
              onChange={handleChange}
              name="price"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDiscountPrice">
            <Form.Label>Discount Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Discount Price"
              value={product.discountPrice}
              onChange={handleChange}
              name="discountPrice"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProductImage">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Image"
              required
              value={product.productImage}
              onChange={handleChange}
              name="productImage"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Description"
              required
              value={product.description}
              onChange={handleChange}
              name="description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTopSellingProduct">
            <Form.Check
              type="checkbox"
              name="isTopProduct"
              label="Top Selling Product"
              checked={product.isTopProduct}
              onChange={handleChange}
            />
          </Form.Group>
          {product_id !== undefined && product_id.length > 0 && (
            <div>
              <Button
                variant="primary"
                type="submit"
                className="pull-right mb-5"
              >
                Update Product
              </Button>
            </div>
          )}
          {product_id === undefined && (
            <div>
              <Button
                variant="primary"
                type="submit"
                className="pull-right mb-5"
              >
                Add New Product
              </Button>
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
}

export default AdminAddEditProduct;
