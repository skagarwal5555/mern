import "../App.css";
import React from "react";
import CellItem from "./TableRowCell";
function TableRow({ row }) {
  return (
    <tr>
      <td>
        <CellItem value={row.id} columIndex={"id"}></CellItem>
      </td>
      <td>
        <CellItem
          value={row.first_name}
          columIndex={"first_name"}
          id={row.id}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.last_name}
          columIndex={"last_name"}
          id={row.id}
        ></CellItem>
      </td>
      <td>
        <CellItem value={row.age} columIndex={"age"} id={row.id}></CellItem>
      </td>
      <td>
        <CellItem
          value={row.salary}
          columIndex={"salary"}
          id={row.id}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.address}
          columIndex={"address"}
          id={row.id}
        ></CellItem>
      </td>
    </tr>
  );
}

export default TableRow;
