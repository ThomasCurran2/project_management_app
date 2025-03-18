import React from "react";
import { Link } from "react-router-dom";

function Projects({ project }) {
  return (
    <div className="Projects">
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>
        {"Due date: " + project.month + "/" + project.day + "/" + project.year}
      </p>
      <p>{project.priority}</p>
      <div>
        <Link to={`/projects/${project.id}`} className="edit_link">
          <h4>edit</h4>
        </Link>
      </div>
    </div>
  );
}

export default Projects;
