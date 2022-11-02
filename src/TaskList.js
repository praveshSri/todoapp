import { Card } from "@mui/material";
import React from "react";
import SingleTask from "./SingleTask";

function TaskList({ toDoList, setTaskStatus, handleEdit, handleDelete }) {
  return (
    <>
      {toDoList.map((todoItem) => {
        return (
          <Card sx={{ width: "100%", margin: '8px', background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",display: 'flex', justify: 'center' }}>
            <SingleTask
              task={todoItem}
              setTaskStatus={setTaskStatus}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Card>
        );
      })}
    </>
  );
}

export default TaskList;
