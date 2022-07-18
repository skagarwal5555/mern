import "../App.css";
import TableRow from "./TableRow";
import React from "react";
import { useSelector } from "react-redux";
function CourseList() {
  const courselistData = useSelector((state) => state.courses);
  var heading = ["Course Id", "Name", "Description", "Proficiency", "Price"];

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
          {courselistData.map((row) => (
            <TableRow row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
