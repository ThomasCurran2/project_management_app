import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Project_form from "./Project_form";
import Projects from "./projects";

function Project_wrapper({ data, currentPage, getAllProjects }) {
  const [isAdding, setIsAdding] = useState(false);

  const [category, setCategory] = useState("Select a category");

  const { state } = useLocation();

  let categories = [
    { label: "Assigned", value: "Assigned" },
    { label: "Priority (High)", value: "High" },
    { label: "Priority (Medium)", value: "Med" },
    { label: "Priority (Low)", value: "Low" },
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const toggleProjectForm = () => {
    {
      setIsAdding(!isAdding);
    }
    console.log(isAdding);
  };

  return (
    <div className="Project_wrapper">
      {!isAdding ? (
        <div className="user_welcome">
          <h4>
            Welcome: {state.User} ({state.perms})
          </h4>
        </div>
      ) : (
        console.log("Not adding a project")
      )}

      {!isAdding ? (
        <div className="title">
          <h1>Projects</h1>
        </div>
      ) : (
        console.log("Not adding a project")
      )}

      {state.perms === "Admin" && !isAdding ? (
        <button className="add_button" onClick={toggleProjectForm}>
          Add New Project
        </button>
      ) : (
        console.log("Not an Admin")
      )}

      {!isAdding ? (
        <div className="category_menu">
          {category}
          <select onChange={handleCategoryChange}>
            <option value={"Select a category"}></option>
            {categories.map((category) => (
              <option value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>
      ) : (
        console.log("Not adding a project")
      )}

      {data?.content?.length === 0 ? (
        <div>
          <h1>No Projects. Please add a new project.</h1>
        </div>
      ) : isAdding ? (
        <div>
          <h1 className="title">Create New Project</h1>
          <Project_form
            toggleProjectForm={toggleProjectForm}
            getAllProjects={getAllProjects}
            userList={state.UserList}
          />
        </div>
      ) : category === "Assigned" ? (
        data.content?.map((project) => (
          <div className="project_div">
            {project.userArray.includes(state.User) ? (
              <Projects
                project={project}
                key={project.id}
                username={state.User}
                empStatus={state.perms}
                userList={state.UserList}
              />
            ) : (
              console.log("Not assigned")
            )}
          </div>
        ))
      ) : category === "High" ? (
        data.content?.map((project) => (
          <div className="project_div">
            {project.priority.includes("High") ? (
              <Projects
                project={project}
                key={project.id}
                username={state.User}
                empStatus={state.perms}
                userList={state.UserList}
              />
            ) : (
              console.log("Not high priority")
            )}
          </div>
        ))
      ) : category === "Med" ? (
        data.content?.map((project) => (
          <div className="project_div">
            {project.priority.includes("Medium") ? (
              <Projects
                project={project}
                key={project.id}
                username={state.User}
                empStatus={state.perms}
                userList={state.UserList}
              />
            ) : (
              console.log("Not medium priority")
            )}
          </div>
        ))
      ) : category === "Low" ? (
        data.content?.map((project) => (
          <div className="project_div">
            {project.priority.includes("Low") ? (
              <Projects
                project={project}
                key={project.id}
                username={state.User}
                empStatus={state.perms}
                userList={state.UserList}
              />
            ) : (
              console.log("Not low priority")
            )}
          </div>
        ))
      ) : (
        data.content?.map((project) => (
          <div className="project_div">
            <Projects
              project={project}
              key={project.id}
              username={state.User}
              empStatus={state.perms}
              userList={state.UserList}
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
