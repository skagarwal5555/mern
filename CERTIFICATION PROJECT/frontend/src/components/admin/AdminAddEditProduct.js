import React, { useState } from "react";
import { Container, Form, Button, Breadcrumb } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UpdateProduct } from "../../redux/actions/productActions";
import * as routes from "../../constants/routes";

function AdminAddEditProduct() {
  const navigate = useNavigate();
  let { product_id } = useParams();
  let Token = useSelector((state) => state.auth.acessToken);

  const objProduct = useSelector((state) =>
    state.products.find((item) => item._id === product_id)
  );

  const InitState = {
    name: "",
    price: "",
    description: "",
    productImage: "",
    discountPrice: "",
    category: {
      name: "",
    },
  };

  let [product, setProduct] = useState(
    objProduct !== undefined ? objProduct : InitState
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
    await UpdateProduct(Token, product);
    setProduct(InitState);
  };

  const handleManageProductsClick = () => {
    navigate(routes.ADMIN_PRODUCTS);
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
                data-testid="update-product-button"
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
                data-testid="add-new-button"
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
