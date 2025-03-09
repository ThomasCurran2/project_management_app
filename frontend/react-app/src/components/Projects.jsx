import React from "react";

function Projects({ task, deleteProject, editProject }) {
  return (
    <div className="Projects">
      <p>{task.task}</p>
      <p>{task.task_desc}</p>
      <p>
        {"Due date: " +
          task.task_month +
          "/" +
          task.task_day +
          "/" +
          task.task_year}
      </p>
      <p>{task.task_prio}</p>
      <div>
        <button className="Edit" onClick={() => editProject(task.id)}>
          Edit
        </button>
        <button className="Delete" onClick={() => deleteProject(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Projects;
