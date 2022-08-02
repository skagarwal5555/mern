import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminAddEditProduct() {
  let { product_id } = useParams();
  console.log("product_id" + product_id);
  let [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    productImage: "",
    discountPrice: "",
    category: {
      name: "",
    },
  });

  useEffect(() => {
    if (product_id !== undefined && product_id.length > 0) {
      console.log("P" + product_id);
      //call api to get product
      async function loadProduct() {
        await axios
          .get(`http://localhost:8081/api/v1/products/${product_id}`)
          .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
              setProduct(res.data.product);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      loadProduct();
    } else {
      console.log("In else");
      setProduct({
        name: "",
        price: "",
        description: "",
        productImage: "",
        discountPrice: "",
        category: {
          name: "",
        },
      });
    }
  }, [product_id]);

  const handleChange = (e) => {
    if (e.target.name === "category.name") {
      setProduct((prevState) => ({
        ...prevState,
        category: {
          ...prevState.category,
          name: e.target.value,
        },
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleCheckOutSubmit = () => {};
  return (
    <Container className="w-50">
      <div className="mt-4">
        <div>
          {product_id !== undefined && product_id.length > 0 && (
            <strong>Edit Product</strong>
          )}
          {product_id === undefined && <strong>Add new Product</strong>}
        </div>
        <Form onSubmit={handleCheckOutSubmit}>
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
              id="isTopProduct"
              label="Top Selling Product"
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
