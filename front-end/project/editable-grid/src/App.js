import "./App.css";
import React from "react";
import Table from "./components/Table";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  //get the filtered data and pass to the table
  const gridData = useSelector((state) => state.tableInfo.filteredData);
  return (
    <div className="App">
      <h1>Inline Editable Table</h1>
      <table className="table table-bordered table-striped table-hover table-condensed">
        <tbody>
          <Header></Header>
          <Table gridData={gridData}></Table>
        </tbody>
      </table>
    </div>
  );
}

export default App;
