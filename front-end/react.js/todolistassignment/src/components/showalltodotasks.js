import "../App.css";
import React from "react";

function ShowAllToDoTasks({todoList,updateTodoList}) {

    function handleToggleTodo(todos) {
      const updatedTodos = todoList.map((t) =>
        t.id === todos.id
          ? {
              ...t,
              done: !t.done,
            }
          : t
      );
      updateTodoList(updatedTodos);
    }

  return (
    <div className="task-list">
    <h3>To Do  List</h3>
    {todoList && todoList.length > 0 ? (
      todoList.map((todo) => (
        <div>
        <input type="checkbox" value={todo.text} key={todo.id} className="task"
         onChange={() => handleToggleTodo(todo)}  />
         <span className="task-name" style={{
              textDecoration: todo.done ? "line-through" : "",
            }} >{todo.text}</span>
         <DeleteTodo todo={todo} updateTodoList={updateTodoList} />
        </div>
      ))
    ) : (
      <h1>No To dos found!</h1>
    )}
  </div>
  );
  
}

function DeleteTodo({ todo, updateTodoList }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      updateTodoList((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer",
      }}
    >
      x
    </span>
  );
}

export default ShowAllToDoTasks;