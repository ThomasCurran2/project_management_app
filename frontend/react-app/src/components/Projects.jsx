import React from "react";

function Projects({ task, deleteProject, editProject }) {
  return (
    <div className="Projects">
      <p>{task.name}</p>
      <p>{task.description}</p>
      <p>{"Due date: " + task.month + "/" + task.day + "/" + task.year}</p>
      <p>{task.prio}</p>
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
