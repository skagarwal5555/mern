import { Row, Col } from "react-bootstrap";
import { LoginCard } from "./Login-card";
import { WelcomeMessageCard } from "./Welcome-message";
import { RegisterCard } from "./Register-card";

export function Login(props) {
  return (
    <Row className="mt-4" style={{ marginRight: "0px", marginLeft: "0px" }}>
      <Col md={2}></Col>
      <Col md={4}>
        <WelcomeMessageCard></WelcomeMessageCard>
      </Col>
      <Col md={4}>{props.isLogin ? <LoginCard /> : <RegisterCard />}</Col>
      <Col md={2}></Col>
    </Row>
  );
}
