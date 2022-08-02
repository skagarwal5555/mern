import axios from "axios";
import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import shop24X7 from "../static/logo_wordmark.png";

function Profile() {
  console.log(useSelector((state) => state));
  const profileState = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.acessToken);
  let [profile, setProfile] = useState(profileState);

  const addressChangeHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  let [isEditing, setIsEditing] = useState(false);
  let [profileImageError, setProfileImageError] = useState("");

  const handleEditBtnClick = (event) => {
    event.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleAddressChange = async (event) => {
    event.preventDefault();

    const config = {
      headers: { token: token },
    };
    const data = {
      streetAddress: profile.address.streetAddress,
      city: profile.address.city,
      state: profile.address.state,
      zipCode: profile.address.zipCode,
    };

    await axios
      .patch("http://localhost:8081/api/v1/profile/address", data, config)
      .then((res) => {
        console.log(res);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProfileImage = async (event) => {
    event.preventDefault();
    const config = {
      headers: { token: token },
    };
    if (profile.profileImage === "" || !profile.profileImage) {
      setProfileImageError(true);
      return null;
    }
    await axios
      .delete("http://localhost:8081/api/v1/profile/image", "", config)
      .then((res) => {
        console.log(res);
        setProfile((prevState) => ({
          ...prevState,
          "profileImage ": "",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProfileImage = async (event) => {
    event.preventDefault();
    const config = {
      headers: { token: token },
    };
    console.log(event.target.value);
    const data = { profileImage: event.target.value };
    await axios
      .patch("http://localhost:8081/api/v1/profile/image", data, config)
      .then((res) => {
        console.log(res);
        setProfile((prevState) => ({
          ...prevState,
          "profileImage ": data.profileImage,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-75">
      <Form onSubmit={handleAddressChange}>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={10} className="content-align-center">
                          {profile.profileImage !== undefined ? (
                            <img
                              src={profile.profileImage}
                              className="rounded-circle"
                              alt={profile.profileImage}
                              data-testid="profile-image"
                            ></img>
                          ) : (
                            <img
                              src={shop24X7}
                              className="rounded-circle"
                              alt={shop24X7}
                              data-testid="profile-image"
                            ></img>
                          )}
                        </Col>
                      </Row>
                      {profileImageError && (
                        <Row>
                          <Col md={12} className="content-align-center">
                            <div className="alert alert-danger">
                              No image to delete
                            </div>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col md={6}>
                          <Button
                            variant="warning"
                            type="button"
                            data-testid="profile-delete-button"
                            onClick={handleDeleteProfileImage}
                          >
                            Delete Image
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            type="file"
                            data-testid="profile-upload-button"
                            onClick={handleUpdateProfileImage}
                          >
                            Upload
                          </Button>
                          <Form.Control
                            type="file"
                            variant="primary"
                            data-testid="profile-upload-button"
                            onChange={handleUpdateProfileImage}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formFirstname"
                          >
                            <Form.Label className="text-muted mb-0">
                              Firstname
                            </Form.Label>
                            <Form.Text className="mt-0 text-dark">
                              <strong data-testid="profile-first-name">
                                {profile.firstname}
                              </strong>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formLastname">
                            <Form.Label className="text-muted mb-0">
                              Lastname
                            </Form.Label>
                            <Form.Text className="mt-0 text-dark">
                              <strong data-testid="profile-last-name">
                                {profile.lastname}
                              </strong>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-muted mb-0">
                          Email
                        </Form.Label>
                        <Form.Text className="mt-0 text-dark">
                          <strong data-testid="profile-email-name">
                            {profile.email}
                          </strong>
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label className="text-muted mb-0">
                          Phone
                        </Form.Label>
                        <Form.Text className="mt-0 text-dark">
                          <strong>{profile.phone}</strong>
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formInterests">
                        <Form.Label className="text-muted mb-0">
                          Interests
                        </Form.Label>
                        <Form.Text className="mt-0 text-dark">
                          <strong>{profile.interests}</strong>
                        </Form.Text>
                      </Form.Group>
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label className="text-muted mb-0">
                              Address
                            </Form.Label>
                            {isEditing && (
                              <>
                                <Form.Group
                                  className="mb-3"
                                  controlId="streetAddress"
                                >
                                  <Form.Label className="text-muted mb-0">
                                    Street Address
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="streetAddress"
                                    value={profile.address.streetAddress}
                                    onChange={addressChangeHandler}
                                    required
                                  />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="city">
                                  <Form.Label className="text-muted mb-0">
                                    City
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={profile.address.city}
                                    onChange={addressChangeHandler}
                                    name="city"
                                    required
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formPhone"
                                >
                                  <Form.Label className="text-muted mb-0">
                                    State
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={profile.address.state}
                                    onChange={addressChangeHandler}
                                    name="state"
                                    required
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="zipCode"
                                >
                                  <Form.Label className="text-muted mb-0">
                                    Zip Code
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="zipCode"
                                    value={profile.address.zipCode}
                                    onChange={addressChangeHandler}
                                    required
                                  />
                                </Form.Group>
                              </>
                            )}
                            {!isEditing && (
                              <Form.Text className="mt-0 text-dark">
                                <strong>
                                  {profile.address !== undefined
                                    ? profile.address.streetAddress +
                                      ", " +
                                      profile.address.city +
                                      ", " +
                                      profile.address.state +
                                      ", " +
                                      (profile.address.zipCode !== 0
                                        ? profile.address.zipCode
                                        : "")
                                    : " "}
                                </strong>
                              </Form.Text>
                            )}
                          </Form.Group>
                          <Row>
                            <Button
                              variant="primary"
                              type="submit"
                              style={{ display: isEditing ? "block" : "none" }}
                            >
                              Save
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                              variant="primary"
                              type="button"
                              style={{ display: isEditing ? "block" : "none" }}
                              onClick={handleEditBtnClick}
                            >
                              Cancel
                            </Button>
                          </Row>
                        </Col>
                        <Col md={6}>
                          {!isEditing && (
                            <Button
                              variant="primary"
                              type="button"
                              onClick={handleEditBtnClick}
                              data-testid="address-edit-button"
                            >
                              Edit
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Profile;
