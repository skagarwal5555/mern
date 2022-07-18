import "../App.css";
import React from "react";
import { useSelector } from "react-redux";
function Enquiries() {
  const data = useSelector((state) => state.enquiries.enquiries);
  var heading = ["CourseId", "User Name", "Email", "Enquiry"];

  return (
    <div className="container">
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

function TableRow({ row }) {
  return (
    <tr>
      <td>{row.cid}</td>
      <td>{row.username}</td>
      <td>{row.email}</td>
      <td>{row.enquiry}</td>
    </tr>
  );
}

export default Enquiries;
