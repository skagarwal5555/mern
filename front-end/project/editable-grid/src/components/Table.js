import TableRow from "./TableRow";

function Table({ gridData }) {
  return gridData.map((item, index) => <TableRow row={item} />);
}

export default Table;
