import "../App.css";
import React, { useEffect, useState } from "react";

function CourseList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/courselist";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json["results"]))
      .catch((error) => console.log(error));

    console.log("Data:" + data);
  }, [data]);

  return (
    <div className="container">
      <p> Course List Page </p>
    </div>
  );
}

export default CourseList;
