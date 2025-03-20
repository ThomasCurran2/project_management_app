import React, { useState } from "react";

function Sign_up_form() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    permission: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handlePermission = (value) => {
    setAccount({ ...account, ["permission"]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const errorMsg = {};

    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (account.username.trim() === "") {
      errorMsg.username = "Username is required";
      isValid = false;
    } else if (specialChars.test(account.username)) {
      errorMsg.username = "Username must not contain any special characters";
      isValid = false;
    }

    if (account.password.trim() === "") {
      errorMsg.password = "Password is required";
      isValid = false;
    } else if (specialChars.test(account.password)) {
      errorMsg.password = "Password must not contain any special characters";
      isValid = false;
    }

    if (account.password.trim() === "Admin") {
      console.log("admin permmision granted");
      handlePermission("Admin");
    } else {
      handlePermission("Employee");
    }
    // Add more rules for password and username format

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

      console.log(account);

      setAccount({
        username: "",
        password: "",
        permission: "",
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
        value={account.username}
        placeholder="Username"
        onChange={onChange}
      ></input>
      {errors.username && <p className="error-message">{errors.username}</p>}

      <p></p>

      <input
        type="text"
        name="password"
        className="password"
        value={account.password}
        placeholder="Password"
        onChange={onChange}
      ></input>
      {errors.password && <p className="error-message">{errors.password}</p>}

      <p></p>

      <button type="submit" className="project_button">
        Create Account
      </button>
    </form>
  );
}

export default Sign_up_form;
