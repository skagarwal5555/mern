import { Container, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

export function Footer() {
  var auth = useSelector((state) => state.auth);
  return (
    <Navbar
      bg={auth.isAdmin ? "info" : "primary"}
      variant="dark"
      fixed="bottom"
    >
      <Container>&copy;{"Copyright " + new Date().getFullYear()}</Container>
    </Navbar>
  );
}
