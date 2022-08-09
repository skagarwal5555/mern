import React from "react";
import { Button, Container } from "react-bootstrap";
import notfound from "../../static/404-not-found.jpg";
import { useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";

function PageNotFound() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate(routes.HOME);
  };
  return (
    <Container className="w-25">
      <div className="mt-5">
        <img src={notfound} width="300" height="300" alt="Access Denied"></img>
        <br></br>&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;
        <Button className="mt-5" onClick={handleLoginClick}>
          Go to Home
        </Button>
      </div>
    </Container>
  );
}

export default PageNotFound;
