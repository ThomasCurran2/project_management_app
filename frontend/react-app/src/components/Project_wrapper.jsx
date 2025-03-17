import React, { useState } from "react";
import Project_form from "./project_form";
import Projects from "./projects";
import Edit_form from "./edit_form";

function Project_wrapper({ data, currentPage, getAllProjects }) {
  const [projects, setProjects] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  const toggleProjectForm = () => {
    {
      setIsAdding(!isAdding);
    }
    console.log(isAdding);
  };

  const deleteProject = (id) =>
    setProjects(projects.filter((project) => project.id !== id));

  const printer = () => {
    projects.map((data) => console.log(data.content.name));
  };

  return (
    <div className="Project_wrapper">
      <h1>Projects</h1>

      <button className="add_button" onClick={toggleProjectForm}>
        Add New Project
      </button>

      <button className="test_button" onClick={printer}>
        test
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
            <Projects
              project={project}
              key={project.id}
              deleteProject={deleteProject}
            />
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
