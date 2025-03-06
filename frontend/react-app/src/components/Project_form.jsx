import React, { useState } from "react";

function Project_form({ addProject }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addProject(value);

    setValue("");
  };

  return (
    <form className="project_form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="project_input"
        value={value}
        placeholder="Create new project"
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit" className="project_button">
        Add Project
      </button>
    </form>
  );
}

export default Project_form;
