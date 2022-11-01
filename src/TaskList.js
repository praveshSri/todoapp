import { Card } from "@mui/material";
import React from "react";
import SingleTask from "./SingleTask";

function TaskList({ toDoList, setTaskStatus, handleEdit,handleDelete }) {
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 700, justifyContent: "space-between" }}>
        {toDoList.map((todoItem) => {
          return (
            <SingleTask
              task={todoItem}
              setTaskStatus={setTaskStatus}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </Card>
    </>
  );
}

export default TaskList;
