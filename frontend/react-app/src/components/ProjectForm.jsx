import React, { useState } from "react";
import { saveProject } from "../api/ProjectService";
import { toastError, toastSuccess } from "../api/ToastService";

/**
 * This component renders the project form when toggled from the project wrapper.
 *
 * @param {Function} toggleProjectForm Function used to toggle between the project form and project wrapper.
 * @param {Function} getAllProjects Function used to get all projects from the database.
 * @param {List.<string>} userList List of every user, used to create the user assignment checkboxes.
 * @returns {ReactNode} A React element that renders the project creation form, with a submit and cancel button.
 */
function ProjectForm({ toggleProjectForm, getAllProjects, userList }) {
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

  /**
   * Sets the data object property changed by the user.
   *
   * @param {Event} e Event used to get what form input was changed.
   */
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * Sets the data object userArray to match what checkboxes are selected.
   *
   * @param {Event} e Event used to get what checkbox was selected and its value.
   */
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

  /**
   * Sets the data object prio property to match the clicked priority button value.
   *
   * @param {string} prio String used to set the prio property value.
   */
  const handlePrioClick = (prio) => {
    setData({ ...data, ["priority"]: prio });
  };

  /**
   * Checks form inputs for errors, saves the project to the database, and returns to the main project page.
   *
   * @param {Event} e Event used to see when the submit button is pressed.
   */
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

  /**
   * Function used to return to the main project page when the cancel button is clicked.
   */
  const goback = () => {
    setData({
      name: "",
      description: "",
      month: "",
      day: "",
      year: "",
      priority: "",
      userArray: [],
    });

    toggleProjectForm();
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

      <h3>Assign workers</h3>

      <div className="checkbox_div" id="checkbox-div">
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

      <button type="button" className="back_button" onClick={goback}>
        Cancel
      </button>
    </form>
  );
}

export default ProjectForm;
