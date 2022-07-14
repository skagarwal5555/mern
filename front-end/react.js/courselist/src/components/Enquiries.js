import "../App.css";
import React, { useEffect, useState } from "react";

function Enquiries() {

  const [data, setData] = useState([]);
  var heading = ['CourseId','User Name', 'Email', 'Enquiry'];
  const makeAPICall = async () => {
    try {
      const url = "http://localhost:4000/enquiries";
    const response = await fetch(url, {mode:'cors'});
      const data = await response.json();
      console.log({ data });
      setData(data);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div className="container">
      <table  className="table table-bordered table-striped table-hover table-condensed">
      <thead>
                    <tr>
                        {heading.map(head => <th>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => <TableRow row={row} />)}
                </tbody>
      </table>
    </div>
  );
}

function TableRow({row}) {

      return (
          <tr>
             <td>{row.cid}</td>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>{row.enquiry}</td>
          </tr>
      )
}

export default Enquiries;
