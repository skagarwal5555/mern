import { Card, Button, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { signInSuccess } from "../../redux/actions/authActions";
import store from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { setProfile } from "../../redux/actions/profileActions";
import { setCartItems } from "../../redux/actions/cartActions";
import axios from "axios";

export function LoginCard() {
  const navigate = useNavigate();
  let state = useSelector((state) => state);
  console.log(state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  let accessToken = "";

  async function Login() {
    let data = { email, password };
    await axios
      .post("http://localhost:8081/api/v1/users/login", data)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Success") {
          accessToken = response.data.accessToken;
        }
      })
      .then(async () => {
        const config = {
          headers: { token: accessToken },
        };
        console.log(config);
        await axios
          .post("http://localhost:8081/api/v1/profile", "", config)
          .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
              let user = res.data.profile;
              store.dispatch(setProfile(user));
              store.dispatch(signInSuccess(accessToken, user.isAdmin));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(async () => {
        const config = {
          headers: { token: accessToken },
        };
        await axios
          .get("http://localhost:8081/api/v1/cart", config)
          .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
              if (res.data.cart !== undefined && res.data.cart.length !== 0) {
                store.dispatch(setCartItems(res.data.cart.items));
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Catch" + err.response.status);
        setIsFailed(true);
        //return err;
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await Login();
    if (accessToken !== "") navigate("/");
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
            <Row className="ml-1">
              <Button
                data-testid="login-submit"
                variant="primary"
                type="submit"
              >
                Login
              </Button>
              <NavLink to="/register" className="nav-link">
                Sign Up
              </NavLink>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Form>
  );
}
