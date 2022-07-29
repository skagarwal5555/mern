import axios from "axios";
import { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

export function RegisterCard() {
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [isNotCreated, setIsNotCreated] = useState(false);
  let [isCreated, setIsCreated] = useState(false);
  let [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event, {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });
    setIsCreated(false);
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
          setIsCreated(true);
        } else {
          setIsNotCreated(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsNotCreated(true);
      });
  };

  return (
    <>
      {isCreated && (
        <div className="alert alert-success">User registered successfully</div>
      )}
      {isNotCreated && (
        <div className="alert alert-danger">User registeration failed</div>
      )}
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Body>
            <Card.Title>Register</Card.Title>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicName">
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
              <Form.Group className="mb-3" controlId="formBasicPassword">
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
              style={{ display: isCreated ? "none" : "block" }}
            >
              Register
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}
