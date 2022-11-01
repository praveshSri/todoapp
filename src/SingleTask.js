import { Button, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import "./SingleTask.css";

function SingleTask({
  task,
  setTaskStatus,
  toggleEditButton,
  handleEdit,
  handleDelete,
}) {
  const [currentEditedTaskId, setCurrentEditedTaskId] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState('');

  function editTask(event) {
    if (event.target.value) {
      setIsEditing(event.target.value);
    }
 }

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div style={{ marginRight: 'auto'}}>
      <Checkbox
        checked={task.completed}
        onChange={() => setTaskStatus(task.id)}
        inputProps={{ "aria-label": "controlled" }}
      />

      {task.id === currentEditedTaskId ? (
        <input
          type="text"
          required
          placeholder={task.task}
          onChange={editTask}
        />
      ) : (
        <span className={task.completed ? "strike" : ""} key={task.id}>
          {task.task}
        </span>
        )}
        </div>

      {task.id === currentEditedTaskId ? (
        <Button
          label="submit"
          size="small"
          onClick={() => handleEdit(task.id, isEditing, setCurrentEditedTaskId)}
        >
          Submit
        </Button>
      ) : (
        <IconButton aria-label="edit" onClick={() => setCurrentEditedTaskId(task.id)}>
          <EditIcon />
        </IconButton>
      )}

      <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default SingleTask;
