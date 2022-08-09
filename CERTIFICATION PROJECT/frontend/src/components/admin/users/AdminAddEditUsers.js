import React, { useState } from "react";
import { Container, Form, Button, Breadcrumb, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddUpdateUser } from "../../../redux/actions/userActions";
import * as routes from "../../../constants/routes";

function AdminAddEditUsers() {
  const navigate = useNavigate();
  let { user_id } = useParams();
  let Token = useSelector((state) => state.auth.acessToken);

  const objUser = useSelector((state) =>
    state.users.find((item) => item._id === user_id)
  );

  const InitState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    interests: "",
    address: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  };

  let [user, setUser] = useState(objUser !== undefined ? objUser : InitState);

  const handleAddressChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    await AddUpdateUser(Token, user);
    setUser(InitState);
  };

  const handleManageUsersClick = () => {
    navigate(routes.ADMIN_USERS);
  };

  return (
    <Container className="w-50">
      <div className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="#" onClick={handleManageUsersClick}>
            Manage Users
          </Breadcrumb.Item>
          <Breadcrumb.Item active>User Info</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          {user_id !== undefined && user_id.length > 0 && (
            <strong>Edit User</strong>
          )}
          {user_id === undefined && <strong>Add new User</strong>}
        </div>
        <Form onSubmit={handleUpdateUser}>
          <Row>
            <Col>
              <Form.Group
                className="mb-3 mt-3"
                controlId="formBasicUserFirstName"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  required
                  value={user.firstname}
                  onChange={handleChange}
                  name="firstname"
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group
                className="mb-3 mt-3"
                controlId="formBasicUserLastName"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={user.lastname}
                  onChange={handleChange}
                  name="lastname"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  data-testid="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  value={user.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formInterest">
                <Form.Label>Interest</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user interest"
                  value={user.interests}
                  onChange={handleChange}
                  name="interests"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="streetAddress">
                <Form.Label className="text-muted mb-0">
                  Street Address
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street address"
                  name="streetAddress"
                  value={user.address.streetAddress}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label className="text-muted mb-0">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={user.address.city}
                  onChange={handleAddressChange}
                  name="city"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label className="text-muted mb-0">State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  value={user.address.state}
                  onChange={handleAddressChange}
                  name="state"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="zipCode">
                <Form.Label className="text-muted mb-0">Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zipcode"
                  name="zipCode"
                  value={user.address.zipCode}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {user_id !== undefined && user_id.length > 0 && (
            <div>
              <Button
                variant="primary"
                type="submit"
                className="pull-right mb-5"
                data-testid="update-user-button"
              >
                Update User
              </Button>
            </div>
          )}
          {user_id === undefined && (
            <div>
              <Button
                variant="primary"
                type="submit"
                className="pull-right mb-5"
                data-testid="add-new-button"
              >
                Add New User
              </Button>
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
}

export default AdminAddEditUsers;
