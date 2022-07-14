import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";

function TableRow({ row }) {
  let Navigate = useNavigate();
  const handleEnquireClick = () => {
    let path = "./AddEnquiry/" + row.id;
    Navigate(path);
  };
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.Description}</td>
      <td>{row.Proficiency}</td>
      <td>
        <NumberFormat
          value={row.Price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </td>
      <td>
        <button onClick={handleEnquireClick}>Enquire</button>
      </td>
    </tr>
  );
}

export default TableRow;
