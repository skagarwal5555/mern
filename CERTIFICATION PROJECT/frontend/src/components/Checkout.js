import React from "react";
import { Container, Form, Button } from "react-bootstrap";

function Checkout() {
  const handleCheckOutSubmit = () => {};
  return (
    <Container className="w-50">
      <div className="mt-4">
        <div>
          <strong>User Info</strong>
        </div>
        <Form onSubmit={handleCheckOutSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter State" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter Zip Code" required />
            </Form.Group>
          </div>
          <div>
            <Button variant="primary" type="submit" className="pull-right mb-5">
              Place Order
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Checkout;
