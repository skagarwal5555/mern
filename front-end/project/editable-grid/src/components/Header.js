import "../App.css";
import HeaderCell from "./HeaderCell";
import { headers } from "../data/headers";

function Header() {
  return (
    <tr>
      {headers.map((row) => {
        return <HeaderCell row={row}></HeaderCell>;
      })}
    </tr>
  );
}

export default Header;
