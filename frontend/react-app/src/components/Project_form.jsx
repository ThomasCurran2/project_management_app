import React, { useEffect, useState } from "react";
import { saveProject } from "../api/ProjectService";
import { toastError, toastSuccess } from "../api/ToastService";

function Project_form({ toggleProjectForm, getAllProjects, userList }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    month: "",
    day: "",
    year: "",
    priority: "",
    userArray: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(data.userArray);
  }, [data.userArray]);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setData((prevData) => ({
        ...prevData,
        userArray: [...prevData.userArray, value],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        userArray: prevData.userArray.filter((element) => element !== value),
      }));
    }
  };

  const handlePrioClick = (prio) => {
    setData({ ...data, ["priority"]: prio });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const errorMsg = {};

    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (data.name.trim() === "") {
      errorMsg.name = "Name is required";
      isValid = false;
    } else if (specialChars.test(data.name)) {
      errorMsg.name = "Name must not contain any special characters";
      isValid = false;
    }

    if (data.description.trim() === "") {
      errorMsg.desc = "Description is required";
      isValid = false;
    } else if (specialChars.test(data.description)) {
      errorMsg.desc = "Description must not contain any special characters";
      isValid = false;
    }

    if (data.month.trim() === "") {
      errorMsg.month = "A month is required";
      isValid = false;
    }

    if (data.day.trim() === "") {
      errorMsg.day = "A day is required";
      isValid = false;
    }

    if (data.year.trim() === "") {
      errorMsg.year = "A year is required";
      isValid = false;
    }

    if (data.priority.trim() === "") {
      errorMsg.prio = "Priority is required";
      isValid = false;
    }

    if (data.userArray.length === 0) {
      errorMsg.users = "At least 1 worker is required";
      isValid = false;
    }

    setErrors(errorMsg);

    if (isValid) {
      try {
        await saveProject(data);
        toastSuccess("Successfully Created Project");
      } catch (error) {
        console.log(error);
        toastError(error);
      }

      setErrors({});

      console.log(data);

      setData({
        name: "",
        description: "",
        month: "",
        day: "",
        year: "",
        priority: "",
        userArray: [],
      });

      getAllProjects();
      toggleProjectForm();
    }
  };

  return (
    <form className="project_form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        className="project_name"
        value={data.name}
        placeholder="Project name"
        onChange={onChange}
      ></input>
      {errors.name && <p className="error-message">{errors.name}</p>}

      <p></p>

      <input
        type="text"
        name="description"
        className="project_desc"
        value={data.description}
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
          value={data.month}
          placeholder="mm"
          onChange={onChange}
        ></input>

        <input
          type="number"
          name="day"
          className="day"
          min="1"
          max="31"
          value={data.day}
          placeholder="dd"
          onChange={onChange}
        ></input>

        <input
          type="number"
          name="year"
          className="year"
          min="2025"
          max="9999"
          value={data.year}
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
          value={data.priority}
          onClick={() => handlePrioClick("Low")}
        >
          Low
        </button>
        <button
          type="button"
          name="priority"
          className="med_priority"
          value={data.priority}
          onClick={() => handlePrioClick("Medium")}
        >
          Medium
        </button>
        <button
          type="button"
          name="priority"
          className="high_priority"
          value={data.priority}
          onClick={() => handlePrioClick("High")}
        >
          High
        </button>
      </div>
      {errors.prio && <p className="error-message">{errors.prio}</p>}

      <div id="checkbox-div">
        {userList.map((element) => (
          <div key={element}>
            <input
              type="checkbox"
              value={element}
              onChange={onCheckboxChange}
            />
            <label>{element}</label>
          </div>
        ))}
      </div>
      {errors.users && <p className="error-message">{errors.users}</p>}

      <button type="submit" className="project_button">
        Add Project
      </button>
    </form>
  );
}

export default Project_form;
