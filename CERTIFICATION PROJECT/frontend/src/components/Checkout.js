import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from "../redux/store/store";
import { clearCart } from "../redux/actions/cartActions";

function Checkout() {
  let state = useSelector((state) => state);
  const navigate = useNavigate();
  let [errMsg, setErrMsg] = useState(false);
  let [successCheckout, setsuccessCheckout] = useState(false);
  let [userInfo, setUserInfo] = useState({
    firstname: state.profile.firstname,
    lastname: state.profile.lastname,
    email: state.profile.email,
    address: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const handleUserInfoChange = (e) => {
    console.log(e.target.name);
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserInfoAddressChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleCheckOutSubmit = async (event) => {
    event.preventDefault();
    let data = "";
    let config = "";
    let cart = state.cart.map((items) => {
      return {
        productId: items.productId._id,
        quantity: items.quantity,
      };
    });
    if (
      state.auth.acessToken !== undefined &&
      state.auth.acessToken.length > 0
    ) {
      //if logged in user
      config = {
        headers: { token: state.auth.acessToken },
      };
      data = {
        cart: cart,
      };
    } else {
      //if guest user
      data = {
        user: userInfo,
        cart: cart,
      };
      console.log(data);
    }

    await axios
      .post("http://localhost:8081/api/v1/checkout", data, config)
      .then((res) => {
        console.log(res);
        setsuccessCheckout(true);
        store.dispatch(clearCart());
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(true);
      });
  };

  return (
    <Container className="w-50">
      {successCheckout ? (
        <div className="alert alert-success mt-5">Checkout Successfull</div>
      ) : (
        " "
      )}
      <div
        className="mt-4"
        style={{ display: successCheckout ? "none" : "block" }}
      >
        <div>
          <strong>User Info</strong>
        </div>
        <Form onSubmit={handleCheckOutSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              required
              value={userInfo.firstname}
              name="firstname"
              onChange={handleUserInfoChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              required
              value={userInfo.lastname}
              onChange={handleUserInfoChange}
              name="lastname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={userInfo.email}
              onChange={handleUserInfoChange}
              name="email"
            />
          </Form.Group>
          <div className="mt-4">
            <div>
              <strong>Shipping Address</strong>
            </div>
            <Form.Group className="mb-3" controlId="formBasicStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Street Address"
                required
                name="streetAddress"
                onChange={handleUserInfoAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                required
                name="city"
                onChange={handleUserInfoAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                required
                name="state"
                onChange={handleUserInfoAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                required
                name="zipCode"
                onChange={handleUserInfoAddressChange}
              />
            </Form.Group>
          </div>
          <div>
            <Button variant="primary" type="submit" className="pull-right mb-5">
              Place Order
            </Button>
          </div>
          {errMsg ? (
            <div className="alert alert-danger">
              Checkout failed. Please try again
            </div>
          ) : (
            ""
          )}
        </Form>
      </div>
    </Container>
  );
}

export default Checkout;
