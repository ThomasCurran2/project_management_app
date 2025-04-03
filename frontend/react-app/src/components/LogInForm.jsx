import React from "react";
import { useState } from "react";
import { getAuthenticated } from "../api/CredentialService";
import { toastError, toastSuccess, toastWarning } from "../api/ToastService";
import { useNavigate } from "react-router-dom";

/**
 * This component renders the log in form when toggled in the credential wrapper.
 * @returns {ReactNode} A React element that renders the log in form and a submit button.
 */
function LogInForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  /**
   * Sets the credentials object property changed by the user.
   *
   * @param {Event} e Event used to get what form input was changed.
   */
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  /**
   * Checks form inputs for errors, authenticates their username/password, and loads the projects page.
   *
   * @param {Event} e Event used to see when the submit button is pressed.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    let logStatus;

    const errorMsg = {};

    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`! @#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (credentials.username.trim() === "") {
      errorMsg.username = "Username is required";
      isValid = false;
    } else if (specialChars.test(credentials.username)) {
      errorMsg.username =
        "Username must not contain any special characters or spaces";
      isValid = false;
    } else if (credentials.username.length < 12) {
      errorMsg.username = "Username must be at leat 12 characters long";
      isValid = false;
    }

    if (credentials.password.trim() === "") {
      errorMsg.password = "Password is required";
      isValid = false;
    } else if (specialChars.test(credentials.password)) {
      errorMsg.password =
        "Password must not contain any special characters or spaces";
      isValid = false;
    } else if (credentials.password.length < 12) {
      errorMsg.password = "Password must be at leat 12 characters long";
      isValid = false;
    }

    setErrors(errorMsg);

    if (isValid) {
      try {
        logStatus = await getAuthenticated(
          credentials.username,
          credentials.password
        );
      } catch (error) {
        console.log(error);
        toastError(error);
      }

      setErrors({});

      setCredentials({
        username: "",
        password: "",
      });

      if (logStatus.data[0] == "true") {
        toastSuccess("Successfully Logged In");
        console.log(logStatus);
        navigate("/projects", {
          state: {
            User: logStatus.data[1],
            perms: logStatus.data[2],
            UserList: logStatus.data[3],
          },
        });
      } else {
        toastWarning("Inncorrect Password!");
      }
    }
  };

  return (
    <form className="log_in_form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        className="username"
        value={credentials.username.toLocaleLowerCase()}
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

export default LogInForm;
