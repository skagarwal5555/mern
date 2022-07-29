import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/actions/authActions";
import store from "../redux/store/store";

export function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { email, password };
    console.log(data);
    await axios
      .post("http://localhost:8081/api/v1/users/login", data)
      .then((response) => {
        console.log("Response" + response.data);
        if (response.data.status === "Success") {
          store.dispatch(signInSuccess(response.data.accessToken));
          console.log("Redirect to Home page");
          navigate("/");
        } else {
          console.log("else" + response.data);
          setIsFailed(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
        }
        console.log("Catch" + err.response.status);
        setIsFailed(true);
      });
  };
  const handleEmail = (event) => {
    setIsFailed(false);
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setIsFailed(false);
    setPassword(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Body className="justify-content-end">
          <Card.Title>Login</Card.Title>
          <Card.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                data-testid="login-email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                data-testid="login-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                required
              />
            </Form.Group>
            {isFailed ? (
              <div className="alert alert-danger">
                Username or Password is incorrect
              </div>
            ) : (
              ""
            )}
          </Card.Text>
          <Button data-testid="login-submit" variant="primary" type="submit">
            Login
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
}
