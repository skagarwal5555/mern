import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteUser } from "../../../redux/actions/userActions";

function AdminUserRow({ user }) {
  const navigate = useNavigate();
  const Token = useSelector((state) => state.auth.acessToken);
  const handleEditUser = () => {
    navigate("/admin/users/" + user._id + "/edit");
  };

  const handleDeleteUser = async () => {
    await DeleteUser(user._id, Token);
  };

  return (
    <>
      <Row data-testid="manage-product-row">
        <Col md={2}>
          <img
            src={user.profileImage}
            alt={user.firstname}
            width="100"
            height="100"
            style={{ border: "1px" }}
          ></img>
        </Col>
        <Col md={6}>
          <div>
            <div>
              <span>
                {user.firstname} {user.lastname}
              </span>
            </div>
            <div>
              <span>{user.email}</span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Button onClick={handleEditUser} variant="link">
            Edit
          </Button>
          &nbsp;|&nbsp;
          <Button
            variant="link"
            style={{ color: "red" }}
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default AdminUserRow;
