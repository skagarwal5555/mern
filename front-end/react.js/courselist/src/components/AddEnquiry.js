import "../App.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddEnquiry() {
  let { cid } = useParams();

  const [data, setData] = useState({
    username: "",
    email: "",
    enquiry: "",
    cid: cid,
    successMessage: "",
    errorMessage: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const makeAPICall = async () => {
    try {
      const requestOptions = {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data),
      };
      console.log("start api call");
      const response = await fetch(
        "http://localhost:4000/enquiries/Add",
        requestOptions
      );
      const errors = await response.json();
      if (!response.ok) {
        //on error
        let errorData = [];
        for (const error of errors.errors) {
          errorData.push(error["msg"]);
        }
        setData((prevState) => ({
          ...prevState,
          errorMessage: "All Fields are Mandatory",
          successMessage: "",
        }));
      } else {
        //on success
        setData((prevState) => ({
          ...prevState,
          username: "",
          email: "",
          enquiry: "",
          errorMessage: "",
          successMessage: "Enquiry Saved successfully",
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeAPICall();
  };

  return (
    <div className="container" style={{ width: "500px" }}>
      <h2>Add Enquiry</h2>
      <br></br>
      <div className="input">
        <input
          type="text"
          name="username"
          value={data.username}
          placeholder="Username"
          onChange={changeHandler}
        />
      </div>
      <br></br>
      <div className="input">
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Email"
          onChange={changeHandler}
        />
      </div>
      <br></br>
      <div className="input">
        <textarea
          type="enquiry"
          name="enquiry"
          value={data.enquiry}
          placeholder="enquiry"
          onChange={changeHandler}
        />
      </div>
      <div
        className="alert alert-success mt-2"
        style={{
          display: data.successMessage ? "block" : "none",
        }}
        role="alert"
      >
        {data.successMessage}
      </div>
      <div
        className="alert alert-danger mt-2"
        style={{
          display: data.errorMessage ? "block" : "none",
        }}
        role="alert"
      >
        {data.errorMessage}
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
