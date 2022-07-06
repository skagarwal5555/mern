import "./App.css";
import CreateToDoList from './components/createtodolist';
import ShowAllToDoList from './components/showalltodotasks';
import {  useState } from "react";
function App() {

  const [taskList, updateTaskList] = useState([]);

  return (
    <div className="App">
      <CreateToDoList setTasks={updateTaskList} taskList={taskList}/>
      <ShowAllToDoList taskList={taskList}/>
    </div>
  );
  
}

export default App;