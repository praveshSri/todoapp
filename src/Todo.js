import React, { useState } from "react";
import TaskList from "./TaskList";

function Todo() {
  const [getInputText, setInputText] = useState("");
  const [toDoList, setToDoList] = useState([]);

  function inputHandler(event) {
    if (!(event.target.value.trim() === "")) {
      setInputText(event.target.value);
    }
  }

  function sortASCByLocale() {
    const tempList = [...toDoList];
    setToDoList(tempList.sort((a, b) => a.task.localeCompare(b.task)));
    }
    function sortDESCByLocale() {
        const tempList = [...toDoList];
        setToDoList(tempList.sort((a, b) => b.task.localeCompare(a.task)));
      }

  function setTaskStatus(taskId) {
    const tempList = toDoList.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setToDoList([...tempList]);
  }

  function resetTasks() {
    setToDoList([]);
  }

  function onEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setToDoList([
        ...toDoList,
        { id: new Date().getTime(), task: getInputText, completed: false },
      ]);
      setInputText("");
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
        }}
      >
        <input
          value={getInputText}
          onChange={inputHandler}
          onKeyDown={(e) => onEnter(e)}
          placeholder="Type 'Todo' and press enter"
        ></input>
        {/* <button onClick={addToHandler}>Add To Do</button> */}
      </div>
      <div>
        <button style={{ marginLeft: "20px" }} onClick={sortASCByLocale}>
          Sort ASC
              </button>
              <button style={{ margin: "0 10px" }} onClick={sortDESCByLocale}>
          Sort DESC
        </button>
        <button style={{ margin: "0 10px" }} onClick={resetTasks}>
          Reset
        </button>
      </div>
      <ul>
        <TaskList
          toDoList={toDoList}
          setTaskStatus={setTaskStatus}
          resetTasks={resetTasks}
        />
      </ul>
    </>
  );
}

export default Todo;
