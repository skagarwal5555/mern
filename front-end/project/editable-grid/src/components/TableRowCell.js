import store from "../store/store";
import { setUpdatedData } from "../actions";
import React from "react";
const itemStyle = {
  padding: "0px",
  position: "relative",
  height: "26px",
  display: "flex",
  alignItems: "center",
  width: "200px",
};

const textStyle = {
  ...itemStyle,
  padding: "0px 4px",
  height: "26px",
  fontFamily: "Arial",
  fontSize: "13px",
};

const inputStyle = {
  padding: "0",
  position: "absolute",
  left: "2px",
  top: "2px",
  right: "45px",
  bottom: "2px",
  minWidth: "20px",
  fontFamily: "Arial",
  fontSize: "13px",
};

function CellItem({ value, rowIndex, columIndex, mode }) {
  const [localMode, setLocalMode] = React.useState(mode ?? "read");
  const [localValue, setLocalValue] = React.useState(value ?? "");
  React.useEffect(() => setLocalMode(mode ?? "read"), [mode]);
  React.useEffect(() => setLocalValue(value ?? ""), [value]);
  if (localMode === "edit") {
    const handleInputChange = (e) => {
      setLocalValue(e.target.value);
    };
    const handleBlur = (e) => {
      //send column and row index to update update of the specific field
      store.dispatch(setUpdatedData(e.target.value, rowIndex, columIndex));
      setLocalMode("read");
    };
    return (
      <div style={itemStyle}>
        <input
          type="text"
          value={localValue}
          style={inputStyle}
          onBlur={handleBlur}
          onChange={handleInputChange}
          autoFocus={true}
        />
      </div>
    );
  }
  if (localMode === "read") {
    const handleEditClick = (e) => {
      setLocalMode("edit");
    };
    return (
      <div style={textStyle} onDoubleClick={handleEditClick}>
        {localValue}
      </div>
    );
  }
}

export default CellItem;
