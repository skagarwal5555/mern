import axios from "axios";
import { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function RegisterCard() {
  let navigate = useNavigate();
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [isNotCreated, setIsNotCreated] = useState(false);
  let [isPasswordMatch, setIsPasswordMatch] = useState(true);
  let [validationError, setValidationError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event, {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });
    setIsNotCreated(false);

    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
    }

    let data = { firstname, lastname, email, password, confirmPassword };
    axios
      .post("http://localhost:8081/api/v1/users/register", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          navigate("/");
        } else {
          setIsNotCreated(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsNotCreated(true);
        if (err.response.data.message !== undefined)
          setValidationError(err.response.data.message);
        else {
          let errMsg = err.response.data.errors
            .map((item) => item.msg)
            .join("\r\n");
          setValidationError(errMsg);
        }
      });
  };

  return (
    <>
      {isNotCreated && (
        <div className="alert alert-danger">{validationError}</div>
      )}
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Body>
            <Card.Title>Register</Card.Title>
            <Card.Text>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      name="firstName"
                      type="text"
                      data-testid="register-first-name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                      name="lastName"
                      type="text"
                      data-testid="register-last-name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  data-testid="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  data-testid="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  data-testid="register-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {!isPasswordMatch && (
                <div className="alert alert-danger">Password did not match</div>
              )}
            </Card.Text>
            <Button
              variant="primary"
              type="submit"
              data-testid="register-submit"
              style={{ display: isNotCreated ? "block" : "none" }}
            >
              Register
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}
