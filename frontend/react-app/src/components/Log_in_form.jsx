import React from "react";
import { useState } from "react";

function Log_in_form() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const errorMsg = {};

    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (credentials.username.trim() === "") {
      errorMsg.username = "Username is required";
      isValid = false;
    } else if (specialChars.test(credentials.username)) {
      errorMsg.username = "Username must not contain any special characters";
      isValid = false;
    }

    if (credentials.password.trim() === "") {
      errorMsg.password = "Password is required";
      isValid = false;
    } else if (specialChars.test(credentials.password)) {
      errorMsg.password = "Password must not contain any special characters";
      isValid = false;
    }

    setErrors(errorMsg);

    if (isValid) {
      /*
        try {
          await saveProject(data);
          toastSuccess("Successfully Created Project");
        } catch (error) {
          console.log(error);
          toastError(error);
        }
  */
      setErrors({});

      console.log(credentials);

      setCredentials({
        username: "",
        password: "",
      });

      //getAllProjects();
      //toggleProjectForm();
    }
  };

  return (
    <form className="sign_up_form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        className="username"
        value={credentials.username}
        placeholder="Username"
        onChange={onChange}
      ></input>
      {errors.username && <p className="error-message">{errors.username}</p>}

      <p></p>

      <input
        type="text"
        name="password"
        className="password"
        value={credentials.password}
        placeholder="Password"
        onChange={onChange}
      ></input>
      {errors.password && <p className="error-message">{errors.password}</p>}

      <p></p>

      <button type="submit" className="project_button">
        Log in!
      </button>
    </form>
  );
}

export default Log_in_form;
