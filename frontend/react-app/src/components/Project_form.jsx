import React, { useState } from "react";

function Project_form({ addProject }) {
  const [Name, setName] = useState("");

  const [Desc, setDesc] = useState("");

  const [Month, setMonth] = useState("");

  const [Day, setDay] = useState("");

  const [Year, setYear] = useState("");

  const [Prio, setPrio] = useState("");

  const [errors, setErrors] = useState({});

  const handlePrioClick = (value) => {
    setPrio(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    const errorMsg = {};

    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (Name.trim() === "") {
      errorMsg.name = "Name is required";
      isValid = false;
    } else if (specialChars.test(Name)) {
      errorMsg.name = "Name must not contain any special characters";
      isValid = false;
    }

    if (Desc.trim() === "") {
      errorMsg.desc = "Description is required";
      isValid = false;
    } else if (specialChars.test(Desc)) {
      errorMsg.desc = "Description must not contain any special characters";
      isValid = false;
    }

    if (Month.trim() === "") {
      errorMsg.month = "A month is required";
      isValid = false;
    }

    if (Day.trim() === "") {
      errorMsg.date = "A day is required";
      isValid = false;
    }

    if (Year.trim() === "") {
      errorMsg.year = "A year is required";
      isValid = false;
    }

    if (Prio.trim() === "") {
      errorMsg.prio = "Priority is required";
      isValid = false;
    }

    setErrors(errorMsg);

    if (isValid) {
      addProject(Name.trim(), Desc.trim(), Month, Day, Year, Prio);

      setName("");
      setDesc("");
      setMonth("");
      setDay("");
      setYear("");
      setPrio("");
      setErrors({});
    }
  };

  return (
    <form className="project_form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="project_name"
        value={Name}
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      {errors.name && <p className="error-message">{errors.name}</p>}

      <p></p>

      <input
        type="text"
        className="project_desc"
        value={Desc}
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      ></input>
      {errors.desc && <p className="error-message">{errors.desc}</p>}

      <p></p>
      <div>
        <h3>Due date</h3>
        <input
          type="number"
          className="month"
          min="1"
          max="12"
          value={Month}
          placeholder="mm"
          onChange={(e) => setMonth(e.target.value)}
        ></input>

        <input
          type="number"
          className="day"
          min="1"
          max="31"
          value={Day}
          placeholder="dd"
          onChange={(e) => setDay(e.target.value)}
        ></input>

        <input
          type="number"
          className="year"
          min="2025"
          max="9999"
          value={Year}
          placeholder="yyyy"
          onChange={(e) => setYear(e.target.value)}
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
          className="low_priority"
          onClick={() => handlePrioClick("Low")}
        >
          Low
        </button>
        <button
          type="button"
          className="med_priority"
          onClick={() => handlePrioClick("Medium")}
        >
          Medium
        </button>
        <button
          type="button"
          className="high_priority"
          onClick={() => handlePrioClick("High")}
        >
          High
        </button>
      </div>
      {errors.prio && <p className="error-message">{errors.prio}</p>}

      <p></p>

      <button type="submit" className="project_button">
        Add Project
      </button>
    </form>
  );
}

export default Project_form;
