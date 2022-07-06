import "../App.css";
import React from "react";

const { useState } = React;

let todoList = [];

function Createdolist(props)
{
    const [task, setTask] = useState({
        taskName: '',
        errorMessage: ''
      });

      const changeHandler = (e) => {
        setTask({
            taskName : e.target.value,
            errorMessage: ''
        })
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.taskName === '')
        {
            console.log("To do task is mandatory");
            setTask(prevState => ({
                ...prevState,
                'errorMessage' : 'To do task is mandatory'
            }))
        }
        else if(props.taskList.includes(task.taskName))
        {
            setTask(prevState => ({
                ...prevState,
                'errorMessage' : 'Task already exists in the list'
            }))
        }
        else
        {
            
            props.setTasks(todoList.concat(task.taskName));
        }
      }

      return (
        <div className="container">
            <h1>Add To Do Task</h1>
              <div className="input">
                      <input
                        type="text"
                        name="taskName"
                        placeholder="to do task"
                        onChange={changeHandler}
                      />
                  </div>
              <div className="buttons" >
                  <button type="submit"
                      onClick={handleSubmit}>
                    Submit
                  </button>
              </div>
              <p className="errorMessage">{task.errorMessage} </p>
        </div>
      );
}


export default Createdolist;