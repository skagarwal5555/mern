import React from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AdminUserRow from "./AdminUserRow";
import { AllUsers } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import * as routes from "../../../constants/routes";

function AdminManageUsers() {
  const navigate = useNavigate();
  const Token = useSelector((state) => state.auth.acessToken);
  const users = useSelector((state) => state.users);

  const loadAllUsers = async () => {
    await AllUsers(Token);
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const handleAddNewUserClick = () => {
    navigate(routes.ADD_USER);
  };
  return (
    <Container className="w-50">
      <div className="mt-4 mb-5">
        <div>
          <strong>Manage Users</strong> &nbsp;
          <Button onClick={handleAddNewUserClick}>Add new user</Button>
        </div>
      </div>
      {users !== undefined && users.length > 0 ? (
        users.map((p) => <AdminUserRow user={p}></AdminUserRow>)
      ) : (
        <div>
          <strong>No Users to display</strong>
        </div>
      )}
    </Container>
  );
}

export default AdminManageUsers;
