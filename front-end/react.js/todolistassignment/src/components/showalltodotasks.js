import "../App.css";
import React from "react";

function ShowAllToDoTasks(props) {
  
    console.log("Task List in showalltodotasks : "+props.taskList);

  return (
    <div className="task-list">
    <h3>To Do Task List</h3>
    {props.taskList && props.taskList.length > 0 ? (
      props.taskList.map((tasks) => (
        <div>
        <input type="checkbox" value={tasks} key={tasks} className="task" /> <span className="task-name">{tasks}</span>
        </div>
      ))
    ) : (
      <h1>No tasks found!</h1>
    )}
  </div>
  );
  
}

export default ShowAllToDoTasks;