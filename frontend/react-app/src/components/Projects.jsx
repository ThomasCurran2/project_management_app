import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Projects({ project, userList, empStatus }) {
  const navigate = useNavigate();

  const toEdit = () => {
    navigate(`/projects/${project.id}`, {
      state: {
        allUsers: userList,
        currUsers: project.userArray,
      },
    });
  };

  return (
    <div className="Projects">
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>
        {"Due date: " + project.month + "/" + project.day + "/" + project.year}
      </p>
      <p>{project.priority}</p>
      <p>{"Assigned workers: " + project.userArray}</p>

      {empStatus === "Admin" ? (
        <div>
          <button className="editButton" onClick={toEdit}>
            edit
          </button>
        </div>
      ) : (
        console.log("No edit permissions")
      )}
    </div>
  );
}

export default Projects;
