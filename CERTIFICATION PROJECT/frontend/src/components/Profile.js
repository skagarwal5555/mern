import axios from "axios";
import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import profileIcon from "../static/profile_icon.png";
import { useRef } from "react";
import store from "../redux/store/store";
import { setAlertMessage } from "../redux/actions/authActions";

function Profile() {
  const inputRef = useRef(null);
  const profileState = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.acessToken);
  let [profile, setProfile] = useState(profileState);
  let [isEditing, setIsEditing] = useState(false);

  const addressChangeHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

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
        store.dispatch(
          setAlertMessage("Profile updated successfully", "success")
        );
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(setAlertMessage("Profile update failed", "failure"));
      });
  };

  const handleDeleteProfileImage = async (event) => {
    event.preventDefault();
    const config = {
      headers: { token: token },
    };
    if (profile.profileImage === "" || !profile.profileImage) {
      store.dispatch(
        setAlertMessage("No image to delete. This is default image", "failure")
      );
      return null;
    }
    await axios
      .delete("http://localhost:8081/api/v1/profile/image", config)
      .then((res) => {
        console.log(res);
        setProfile((prevState) => ({
          ...prevState,
          profileImage: "",
        }));
        store.dispatch(
          setAlertMessage("Profile image deleted successfully", "success")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadImageClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const handleUpdateProfileImage = async (event) => {
    event.preventDefault();

    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    let formData = new FormData();

    // Update the formData object
    formData.append("profileImage", fileObj);
    const config = {
      headers: { token: token, "Content-Type": "multipart/form-data" },
    };
    await axios
      .patch("http://localhost:8081/api/v1/profile/image", formData, config)
      .then((res) => {
        store.dispatch(
          setAlertMessage("Profile image updated successfully", "success")
        );
        const configHeader = {
          headers: { token: token },
        };
        axios
          .post("http://localhost:8081/api/v1/profile", "", configHeader)
          .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
              let user = res.data.profile;
              store.dispatch(setProfile(user));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(
          setAlertMessage("Profile image upload failed", "failure")
        );
      });
  };
  return (
    <div className="w-75">
      <Form>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col md={4}>
                      <Row>
                        <Col md={10} className="content-align-center">
                          {profile.profileImage !== undefined &&
                          profile.profileImage.length > 0 ? (
                            <img
                              src={profile.profileImage}
                              className="rounded-circle"
                              alt={profile.profileImage}
                              data-testid="profile-image"
                              height="200"
                              width="200"
                            ></img>
                          ) : (
                            <img
                              src={profileIcon}
                              className="rounded-circle"
                              alt={profileIcon}
                              data-testid="profile-image"
                              height="200"
                              width="200"
                            ></img>
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md={8}>
                          <Button
                            variant="warning"
                            type="button"
                            data-testid="profile-delete-button"
                            onClick={handleDeleteProfileImage}
                          >
                            Delete Image
                          </Button>{" "}
                          &nbsp;
                          <Button
                            variant="primary"
                            type="file"
                            data-testid="profile-upload-button"
                            onClick={handleUploadImageClick}
                          >
                            Upload
                          </Button>
                          <input
                            style={{ display: "none" }}
                            ref={inputRef}
                            type="file"
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
                              onClick={handleAddressChange}
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
