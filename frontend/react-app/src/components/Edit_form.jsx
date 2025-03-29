import React, { useState, useEffect } from "react";
import { deleteProject, getProject, saveProject } from "../api/ProjectService";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../api/ToastService";

function Edit_form() {
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    month: "",
    day: "",
    year: "",
    priority: "",
    userArray: [],
  });

  const [errors, setErrors] = useState({});

  const { id } = useParams();
  console.log(id);

  const { state } = useLocation();

  const navigate = useNavigate();

  const fetchProject = async (id) => {
    try {
      const { data } = await getProject(id);
      setProject(data);
      console.log(project);
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  const onCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setProject((prevProject) => ({
        ...prevProject,
        userArray: [...prevProject.userArray, value],
      }));
    } else {
      setProject((prevProject) => ({
        ...prevProject,
        userArray: prevProject.userArray.filter((element) => element !== value),
      }));
    }
    console.log(project.userArray);
  };

  const tryDelete = async (id) => {
    try {
      await deleteProject(id);
      toastSuccess("Successfully Deleted Project");
      navigate("/projects", {
        state: {
          User: state.name,
          perms: state.permission,
          UserList: state.allUsers,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  const goBack = async () => {
    navigate("/projects", {
      state: {
        User: state.name,
        perms: state.permission,
        UserList: state.allUsers,
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    fetchProject(id);
  }, []);

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handlePrioClick = (prio) => {
    setProject({ ...project, ["priority"]: prio });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const errorMsg = {};

    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (project.name.trim() === "") {
      errorMsg.name = "Name is required";
      isValid = false;
    } else if (specialChars.test(project.name)) {
      errorMsg.name = "Name must not contain any special characters";
      isValid = false;
    }

    if (project.description.trim() === "") {
      errorMsg.desc = "Description is required";
      isValid = false;
    } else if (specialChars.test(project.description)) {
      errorMsg.desc = "Description must not contain any special characters";
      isValid = false;
    }

    if (project.month.trim() === "") {
      errorMsg.month = "A month is required";
      isValid = false;
    }

    if (project.day.trim() === "") {
      errorMsg.day = "A day is required";
      isValid = false;
    }

    if (project.year.trim() === "") {
      errorMsg.year = "A year is required";
      isValid = false;
    }

    if (project.priority.trim() === "") {
      errorMsg.prio = "Priority is required";
      isValid = false;
    }

    if (project.userArray.length === 0) {
      errorMsg.users = "At least 1 worker is required";
      isValid = false;
    }

    setErrors(errorMsg);

    if (isValid) {
      try {
        await saveProject(project);
        toastSuccess("Successfully Updated Project");
      } catch (error) {
        console.log(error);
        toastError(error);
      }

      setErrors({});

      setProject({
        name: "",
        description: "",
        month: "",
        day: "",
        year: "",
        priority: "",
        userArray: [],
      });

      fetchProject(id);
    }
  };

  return (
    <div>
      <h1 className="title">Edit Project</h1>
      <form className="project_form" onSubmit={handleSubmit}>
        <input
          type="hidden"
          defaultValue={project.id}
          name="id"
          required
        ></input>
        <input
          type="text"
          name="name"
          className="project_name"
          value={project.name}
          placeholder="Project name"
          onChange={onChange}
        ></input>
        {errors.name && <p className="error-message">{errors.name}</p>}

        <p></p>

        <input
          type="text"
          name="description"
          className="project_desc"
          value={project.description}
          placeholder="Description"
          onChange={onChange}
        ></input>
        {errors.desc && <p className="error-message">{errors.desc}</p>}

        <p></p>
        <div>
          <h3>Due date</h3>
          <input
            type="number"
            name="month"
            className="month"
            min="1"
            max="12"
            value={project.month}
            placeholder="mm"
            onChange={onChange}
          ></input>

          <input
            type="number"
            name="day"
            className="day"
            min="1"
            max="31"
            value={project.day}
            placeholder="dd"
            onChange={onChange}
          ></input>

          <input
            type="number"
            name="year"
            className="year"
            min="2025"
            max="9999"
            value={project.year}
            placeholder="yyyy"
            onChange={onChange}
          ></input>
        </div>
        {errors.month && <p className="error-message">{errors.month}</p>}
        {errors.day && <p className="error-message">{errors.day}</p>}
        {errors.year && <p className="error-message">{errors.year}</p>}

        <p></p>

        <div>
          <h3>Project priority</h3>
          <p></p>
          <button
            type="button"
            name="priority"
            className="low_priority"
            value={project.priority}
            onClick={() => handlePrioClick("Low")}
          >
            Low
          </button>
          <button
            type="button"
            name="priority"
            className="med_priority"
            value={project.priority}
            onClick={() => handlePrioClick("Medium")}
          >
            Medium
          </button>
          <button
            type="button"
            name="priority"
            className="high_priority"
            value={project.priority}
            onClick={() => handlePrioClick("High")}
          >
            High
          </button>
        </div>
        {errors.prio && <p className="error-message">{errors.prio}</p>}

        <h3>Assign workers</h3>

        <div className="checkbox_div" id="checkbox-div">
          {state.allUsers.map((element) => (
            <div key={element}>
              <input
                type="checkbox"
                value={element}
                checked={project.userArray.includes(element)}
                onChange={onCheckboxChange}
              />
              <label>{element}</label>
            </div>
          ))}
        </div>
        {errors.users && <p className="error-message">{errors.users}</p>}

        <p></p>

        <button type="submit" className="project_button">
          Confirm
        </button>

        <button
          type="button"
          className="delete_button"
          onClick={() => tryDelete(id)}
        >
          Delete
        </button>

        <button type="button" className="back_button" onClick={goBack}>
          Back
        </button>
      </form>
    </div>
  );
}

export default Edit_form;
