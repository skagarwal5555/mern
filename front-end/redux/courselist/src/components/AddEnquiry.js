import "../App.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { callAddEnquiry } from "../actions";
import store from "../store/store";
import { useSelector } from "react-redux";
function AddEnquiry() {
  let { cid } = useParams();
  const [enquiry, setData] = useState({
    eid: Math.random(),
    username: "",
    email: "",
    enquiry: "",
    cid: cid,
    errorMessage: "",
    successMessage: "",
  });

  const data = useSelector((state) => state.enquiries);

  const changeHandler = (e) => {
    setData({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(callAddEnquiry(enquiry));
  };

  return (
    <div className="container" style={{ width: "500px" }}>
      <h2>Add Enquiry</h2>
      <br></br>
      <div className="input">
        <input
          type="text"
          name="username"
          value={enquiry.username}
          placeholder="Username"
          onChange={changeHandler}
        />
      </div>
      <br></br>
      <div className="input">
        <input
          type="email"
          name="email"
          value={enquiry.email}
          placeholder="Email"
          onChange={changeHandler}
        />
      </div>
      <br></br>
      <div className="input">
        <textarea
          type="enquiry"
          name="enquiry"
          value={enquiry.enquiry}
          placeholder="enquiry"
          onChange={changeHandler}
        />
      </div>
      <div
        className="alert alert-success mt-2"
        style={{
          display: data !== undefined && data.successMessage ? "block" : "none",
        }}
        role="alert"
      >
        {data !== undefined ? data.successMessage : ""}
      </div>
      <div
        className="alert alert-danger mt-2"
        style={{
          display: data !== undefined && data.errorMessage ? "block" : "none",
        }}
        role="alert"
      >
        {data !== undefined ? data.errorMessage : ""}
      </div>
      <div className="buttons">
        <button
          type="submit"
          className="btn btn-warning"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddEnquiry;
