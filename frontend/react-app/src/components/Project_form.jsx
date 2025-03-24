import React, { useEffect, useState, useRef } from "react";
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

  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      loadCheckboxes();
    } else {
      console.log("checkboxes not found");
    }
  }, []);

  const loadCheckboxes = () => {
    console.log(userList);
    userList.forEach((element) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = element;
      checkbox.onChange = { onCheckboxChange };

      const label = document.createElement("label");
      label.textContent = element;

      checkboxRef.current.appendChild(checkbox);
      checkboxRef.current.appendChild(label);
      checkboxRef.current.appendChild(document.createElement("br"));
    });
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData({ ...data, ["userArray"]: value });
      console.log(data);
    } else {
      setData(data.filter((e) => e !== value));
      console.log(data);
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
      errorMsg.date = "A day is required";
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

      <div ref={checkboxRef} id="checkbox-div"></div>

      <p></p>

      <button type="submit" className="project_button">
        Add Project
      </button>
    </form>
  );
}

export default Project_form;
