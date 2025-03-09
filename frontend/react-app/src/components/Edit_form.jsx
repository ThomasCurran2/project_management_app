import React, { useState } from "react";

function Edit_form({ editProject, task }) {
  const [Name, setName] = useState(task.task);

  const [Desc, setDesc] = useState(task.task_desc);

  const [Month, setMonth] = useState(task.task_month);

  const [Day, setDay] = useState(task.task_day);

  const [Year, setYear] = useState(task.task_year);

  const [Prio, setPrio] = useState(task.task_prio);

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
      editProject(Name, Desc, Month, Day, Year, Prio, task.id);

      setName("");
      setDesc("");
      setMonth("");
      setDay("");
      setYear("");
      setPrio("");
    }

    console.log(Name, Desc, Date, Prio);
  };

  return (
    <form className="project_form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="project_name"
        value={Name}
        placeholder="Update project"
        onChange={(e) => setName(e.target.value)}
      ></input>
      {errors.name && <p className="error-message">{errors.name}</p>}

      <p></p>

      <input
        type="text"
        className="project_desc"
        value={Desc}
        placeholder="Update description"
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
        Update
      </button>
    </form>
  );
}

export default Edit_form;
