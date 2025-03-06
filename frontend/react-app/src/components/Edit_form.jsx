import React, { useState } from "react";

function Edit_form({ editProject, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    editProject(value, task.id);

    setValue("");
  };

  return (
    <form className="project_form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="project_input"
        value={value}
        placeholder="Update project"
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit" className="project_button">
        Update
      </button>
    </form>
  );
}

export default Edit_form;
