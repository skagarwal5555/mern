import { Container, Navbar } from "react-bootstrap";

export function Footer() {
  return (
    <Navbar bg="primary" variant="dark" fixed="bottom">
      <Container>&copy;{"Copyright " + new Date().getFullYear()}</Container>
    </Navbar>
  );
}
