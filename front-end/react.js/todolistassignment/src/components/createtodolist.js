import "../App.css";
import React from "react";
import { useRef } from "react";

const { useState } = React;

function Createdolist({updateTodoList})
{
  const inputRef = useRef();

    const [todo, setTodo] = useState({
        id: '',
        text: '',
        done : false,
        errorMessage: ''
      });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef.current);
        const text = e.target.elements.addTodo.value;
        inputRef.current.value = "";

        if(text === '')
        {
            console.log("To do task is mandatory");
            setTodo(prevState => ({
                ...prevState,
                'errorMessage' : 'To do task is mandatory'
            }))
        }
        else
        {
          updateTodoList((prevTodos) => {
            var obj = prevTodos.find(o => o.text === text && o.done === false);
            if(obj!=null && obj.id>0)
            {
                setTodo(prevState => ({
                  ...prevState,
                  'errorMessage' : 'Task already exists in the list'
              }));
              return prevTodos;
            }
            else
            {
                  const todo = {
                  id: Math.random(),
                  text: text,
                  done: false,
                  };
               
                  return prevTodos.concat(todo);
            }
          });
        }
      }

      return (
        <form onSubmit={handleSubmit}>
          <div className="container">
              <h1>Add To Do List</h1>
                <div className="input">
                        <input
                          type="text"
                          name="addTodo"
                          placeholder="to do task"
                          ref={inputRef}
                        />
                    </div>
                <div className="buttons" >
                    <button type="submit">
                      Submit
                    </button>
                </div>
                <p className="errorMessage">{todo.errorMessage} </p>
          </div>
        </form>
      );
}


export default Createdolist;