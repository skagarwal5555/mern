import "../App.css";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

function CourseList() {
  const [data, setData] = useState([]);
  var heading = ["Course Id", "Name", "Description", "Proficiency", "Price"];
  const makeAPICall = async () => {
    try {
      const url = "http://localhost:4000/courselist";
      const response = await fetch(url, { mode: "cors" });
      const data = await response.json();
      console.log({ data });
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div className="container">
      <h2>Course List</h2>
      <table className="table table-bordered table-striped table-hover table-condensed">
        <thead>
          <tr>
            {heading.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
