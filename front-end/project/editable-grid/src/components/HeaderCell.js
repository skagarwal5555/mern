import { useSelector } from "react-redux";
import store from "../store/store";
import { callFilterData, callSetSortKeyOrder, callSortData } from "../actions";

function HeaderCell({ row }) {
  //get the entire state from store
  const tableInfo = useSelector((state) => state.tableInfo);

  // function to handle sorting
  function changeSort(key) {
    //by default all sorting is ascending
    //if the key does not match with what is in store return desc else decide based on current sortOrder
    let newSortOrder =
      tableInfo.sortKey === key
        ? tableInfo.sortOrder === "ascn"
          ? "desc"
          : "ascn"
        : "desc";

    //call dispatch to set order and key
    store.dispatch(callSetSortKeyOrder(key, newSortOrder));

    //call dispatch to sort the filtered data
    store.dispatch(
      callSortData([...tableInfo.filteredData], key, newSortOrder)
    );
  }

  const handleFilter = (e) => {
    console.log(e.target.name);
    store.dispatch(
      callFilterData(
        e.target.value,
        e.target.name,
        tableInfo.sortKey,
        tableInfo.sortOrder
      )
    );
  };

  return (
    <td key={row.key}>
      {row.label}{" "}
      <button
        onClick={() => changeSort(row.key)}
        className={`${
          tableInfo.sortKey === row.key && tableInfo.sortOrder === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        ▲
      </button>
      <br></br>
      <input name={row.key} onChange={handleFilter}></input>
    </td>
  );
}

export default HeaderCell;
