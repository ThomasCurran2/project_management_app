import React, { useState } from "react";
import Project_form from "./project_form";
import { v4 as uuidv4 } from "uuid";
import Projects from "./projects";
import Edit_form from "./edit_form";

uuidv4();

function Project_wrapper({ data, currentPage, getAllProjects }) {
  const [projects, setProjects] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const toggleProjectForm = () => {
    {
      setIsAdding(!isAdding);
    }
    console.log(isAdding);
  };

  const addProject = (name, desc, month, day, year, prio) => {
    setProjects([
      ...projects,
      {
        id: uuidv4(),
        task: name,
        task_desc: desc,
        task_month: month,
        task_day: day,
        task_year: year,
        task_prio: prio,
        completed: false,
        isEditing: false,
      },
    ]);
    toggleProjectForm();
    console.log(projects);
  };

  const deleteProject = (id) =>
    setProjects(projects.filter((project) => project.id !== id));

  const editProject = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, isEditing: !project.isEditing }
          : project
      )
    );
    setEditOpen(true);
  };

  const editTask = (
    task,
    task_desc,
    task_month,
    task_day,
    task_year,
    task_prio,
    id
  ) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              task,
              task_desc,
              task_month,
              task_day,
              task_year,
              task_prio,
              isEditing: !project.isEditing,
            }
          : project
      )
    );
    setEditOpen(false);
    console.log(task_desc);
  };

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
          <Project_form addProject={addProject} />
        </div>
      ) : editOpen ? (
        projects.map((project) =>
          project.isEditing ? (
            <div>
              <h1>Edit Project</h1>

              <Edit_form
                editProject={editTask}
                task={project}
                task_desc={project.task_desc}
                task_month={project.task_month}
                task_day={project.task_day}
                task_year={project.task_year}
                task_prio={project.task_prio}
              />
            </div>
          ) : null
        )
      ) : (
        data.content?.map((project) => (
          <div>
            <Projects
              task={project}
              key={project.id}
              deleteProject={deleteProject}
              editProject={editProject}
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
