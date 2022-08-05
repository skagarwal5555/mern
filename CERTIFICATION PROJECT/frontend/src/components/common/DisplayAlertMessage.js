import React from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setAlertMessage } from "../../redux/actions/authActions";
import store from "../../redux/store/store";
function DisplayAlertMessage() {
  let auth = useSelector((state) => state.auth);
  const resetToast = () => {
    store.dispatch(setAlertMessage("", ""));
  };
  return (
    <div className="d-flex flex-row-reverse">
      <Toast
        show={auth.message.length > 0 && auth.msgType === "success"}
        onClose={resetToast}
        delay={3000}
        autohide
        className="bg-success toast-container position-fixed"
        style={{ display: auth.msgType === "success" ? "block" : "none" }}
      >
        <Toast.Body>{auth.message}</Toast.Body>
      </Toast>
      <Toast
        show={auth.message.length > 0 && auth.msgType === "failure"}
        onClose={resetToast}
        delay={3000}
        autohide
        className="bg-danger toast-container position-fixed"
        style={{ display: auth.msgType === "failure" ? "block" : "none" }}
      >
        <Toast.Body>{auth.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default DisplayAlertMessage;
