import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Project_form from "./project_form";
import Projects from "./projects";

function Project_wrapper({ data, currentPage, getAllProjects }) {
  const [isAdding, setIsAdding] = useState(false);

  const { state } = useLocation();

  const toggleProjectForm = () => {
    {
      setIsAdding(!isAdding);
    }
    console.log(isAdding);
  };

  return (
    <div className="Project_wrapper">
      <h1>Projects</h1>

      <div>
        <h1>{state.User}</h1>
        <h1>{state.perms}</h1>
      </div>

      <button className="add_button" onClick={toggleProjectForm}>
        Add New Project
      </button>

      {data?.content?.length === 0 ? (
        <div>
          <h1>No Projects. Please add a new project.</h1>
        </div>
      ) : isAdding ? (
        <div>
          <h1>Create New Project</h1>
          <Project_form
            toggleProjectForm={toggleProjectForm}
            getAllProjects={getAllProjects}
          />
        </div>
      ) : (
        data.content?.map((project) => (
          <div>
            <Projects project={project} key={project.id} />
          </div>
        ))
      )}

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div>
          <a
            onClick={() => getAllProjects(currentPage - 1)}
            className={0 === currentPage ? "disabled" : ""}
          >
            &laquo;
          </a>

          {data &&
            [...Array(data.totalPages).keys()].map((page) => (
              <a
                onClick={getAllProjects(page)}
                className={currentPage === page ? "active" : ""}
                key={page}
              >
                {page + 1}
              </a>
            ))}

          <a
            onClick={() => getAllProjects(currentPage + 1)}
            className={data.totalPages + 1 === currentPage ? "disabled" : ""}
          >
            &raquo;
          </a>
        </div>
      )}
    </div>
  );
}

export default Project_wrapper;
