import React  from 'react';
import "./App.css";
import CreateToDoList from './components/createtodolist';
import ShowAllToDoList from './components/showalltodotasks';
import {  useState } from "react";
function App() {

  const [todoList, updateTodoList] = useState([]);

  return (
    <div className="App">
      <CreateToDoList updateTodoList={updateTodoList}/>
       <ShowAllToDoList todoList={todoList} updateTodoList={updateTodoList}/> 
    </div>
  );
  
}

export default App;