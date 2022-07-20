import "../App.css";
import React from "react";
import CellItem from "./TableRowCell";
function TableRow({ row, rowIndex }) {
  return (
    <tr>
      <td>
        <CellItem
          value={row.id}
          rowIndex={rowIndex}
          columIndex={"id"}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.first_name}
          rowIndex={rowIndex}
          columIndex={"first_name"}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.last_name}
          rowIndex={rowIndex}
          columIndex={"last_name"}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.age}
          rowIndex={rowIndex}
          columIndex={"age"}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.salary}
          rowIndex={rowIndex}
          columIndex={"salary"}
        ></CellItem>
      </td>
      <td>
        <CellItem
          value={row.address}
          rowIndex={rowIndex}
          columIndex={"address"}
        ></CellItem>
      </td>
    </tr>
  );
}

export default TableRow;
