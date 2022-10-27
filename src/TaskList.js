import React from "react";
import SingleTask from "./SingleTask";

function TaskList({ toDoList, setTaskStatus }) {
  return (
    <>
      <ul>
        {toDoList.map((todoItem) => {
          return (
            <SingleTask
              task={todoItem}
              setTaskStatus={setTaskStatus}
            />
          );
        })}
      </ul>
    </>
  );
}

export default TaskList;
