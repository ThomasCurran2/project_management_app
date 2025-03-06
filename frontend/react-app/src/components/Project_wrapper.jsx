import React, { useState } from "react";
import Project_form from "./project_form";
import { v4 as uuidv4 } from "uuid";
import Projects from "./projects";
import Edit_form from "./edit_form";

uuidv4();

function Project_wrapper() {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects([
      ...projects,
      { id: uuidv4(), task: project, completed: false, isEditing: false },
    ]);
    console.log(projects);
  };

  const deleteProject = (id) =>
    setProjects(projects.filter((projects) => projects.id !== id));

  const editProject = (id) =>
    setProjects(
      projects.map((projects) =>
        projects.id === id
          ? { ...projects, isEditing: !projects.isEditing }
          : projects
      )
    );

  const editTask = (task, id) =>
    setProjects(
      projects.map((projects) =>
        projects.id === id
          ? { ...projects, task, isEditing: !projects.isEditing }
          : projects
      )
    );

  return (
    <div className="Project_wrapper">
      <h1>Projects</h1>
      <Project_form addProject={addProject} />
      {projects.map((project, index) =>
        project.isEditing ? (
          <Edit_form editProject={editTask} task={project} />
        ) : (
          <Projects
            task={project}
            key={index}
            deleteProject={deleteProject}
            editProject={editProject}
          />
        )
      )}
    </div>
  );
}

export default Project_wrapper;
