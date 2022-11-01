import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import TaskList from "./TaskList";
import "./Todo.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Todo() {
  const [getInputText, setInputText] = useState("");
  const [getDate, setDate] = useState(null);
  const [toDoList, setToDoList] = useState([]);
  const [sortOrder, setSortOrder] = React.useState(true);

  function inputHandler(event) {
    if (!(event.target.value.trim() === "")) {
      setInputText(event.target.value);
    } else {
      setInputText("");
    }
  }
  function addToHandler() {
    setToDoList([
      ...toDoList,
      { id: new Date().getTime(), task: getInputText, completed: false },
    ]);
    localStorage.setItem(
      "Tasks",
      JSON.stringify([
        ...toDoList,
        { id: new Date().getTime(), task: getInputText, completed: false },
      ])
    );
    setInputText("");
  }
  function onEnter(e) {
    if (getInputText && getInputText === "") return;
    if (e.key === "Enter") {
      e.preventDefault();
      setToDoList([
        ...toDoList,
        { id: new Date().getTime(), task: getInputText, completed: false },
      ]);
      localStorage.setItem(
        "Tasks",
        JSON.stringify([
          ...toDoList,
          { id: new Date().getTime(), task: getInputText, completed: false },
        ])
      );
      setInputText("");
    }
  }
  function handleEdit(taskId, editData, setCurrentEditedTaskId) {
    const tempList = toDoList.map((task) => {
      if (task.id === taskId) {
        task.task = editData;
      }
      return task;
    });
    setToDoList([...tempList]);
    localStorage.setItem("Tasks", JSON.stringify([...tempList]));
    setCurrentEditedTaskId(null);
  }
  function handleDelete(taskId) {
    const tempList = [...toDoList];
    setToDoList(tempList.filter((item) => item.id !== taskId));
  }

  React.useEffect(() => {
    console.log("tasks", localStorage.getItem("Tasks"));
    if (!localStorage.getItem("Tasks")) return;
    setToDoList(JSON.parse(localStorage.getItem("Tasks")));
  }, []);

  function setTaskStatus(taskId) {
    const tempList = toDoList.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setToDoList([...tempList]);
    localStorage.setItem("Tasks", JSON.stringify([...tempList]));
  }
  function resetTasks() {
    setToDoList([]);
    localStorage.setItem("Tasks", "");
  }

  // Bottom Actions
  function showAllTasks() {
    setToDoList(JSON.parse(localStorage.getItem("Tasks")));
  }
  function showActiveTasks() {
    const tempList = JSON.parse(localStorage.getItem("Tasks"));
    setToDoList(tempList.filter((item) => !item.completed));
  }
  function showCompletedTasks() {
    const tempList = JSON.parse(localStorage.getItem("Tasks"));
    setToDoList(tempList.filter((item) => item.completed));
  }
  function sortByLocale() {
    const tempList = [...toDoList];
    if (sortOrder) {
      setSortOrder(false);
      setToDoList(tempList.sort((a, b) => a.task.localeCompare(b.task)));
    } else {
      setSortOrder(true);
      setToDoList(tempList.sort((a, b) => b.task.localeCompare(a.task)));
    }
  }
  return (
    <div className="main">
      <div className="header">
        <h1>Todo App</h1>
      </div>
      <div className="content">
        <div className="inputBox">
          <TextField
            className="inputBox"
            required
            placeholder="Type 'Todo' and press enter"
            value={getInputText}
            onChange={inputHandler}
            onKeyDown={(e) => onEnter(e)}
            variant="standard"
          />
          <Button variant="contained" size="small" onClick={addToHandler}>
            Add To Do
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              size="small"
              label="Select Date"
              value={getDate}
              onChange={(newDate) => {
                getDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <ul>
          <TaskList
            toDoList={toDoList}
            setTaskStatus={setTaskStatus}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            resetTasks={resetTasks}
          />
        </ul>
      </div>
      <div className="viewButtons">
        <Button variant="outlined" color="success" onClick={showAllTasks}>All Tasks</Button>
        <Button variant="outlined" color="success" onClick={showActiveTasks}>Active Tasks</Button>
        <Button variant="outlined" color="success" onClick={showCompletedTasks}>Completed Tasks</Button>
        <Button variant="outlined" color="success" onClick={sortByLocale}>Sort</Button>
        <Button variant="outlined" color="error" onClick={resetTasks}>Reset</Button>
      </div>
    </div>
  );
}

export default Todo;
