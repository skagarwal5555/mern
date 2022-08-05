import React from "react";
import { Button, Container } from "react-bootstrap";
import accessDenied from "../../static/accessDenied.png";
import { useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";

function AccessDeniedPage() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate(routes.LOGIN);
  };
  return (
    <Container className="w-25">
      <div className="mt-5">
        <img
          src={accessDenied}
          width="300"
          height="300"
          alt="Access Denied"
        ></img>
        <br></br>&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;
        <Button className="mt-5" onClick={handleLoginClick}>
          Go to Login
        </Button>
      </div>
    </Container>
  );
}

export default AccessDeniedPage;
