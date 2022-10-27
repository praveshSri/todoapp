import React from "react";
import "./SingleTask.css";

function SingleTask({ task, setTaskStatus }) {
    return (
      <div style={{display: "flex"}}>
          <input checked={task.completed} onChange={() => setTaskStatus(task.id)} type="checkbox"></input>
          <div className={task.completed ? "strike" : ""} key={task.id}>{task.task}</div>
    </div>
  );
}

export default SingleTask;
