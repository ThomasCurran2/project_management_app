import React, { useState } from "react";
import { saveCredential } from "../api/CredentialService";
import { toastError, toastSuccess } from "../api/ToastService";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const errorMsg = {};
    //at least 12 chars long
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`! @#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (account.username.trim() === "") {
      errorMsg.username = "Username is required";
      isValid = false;
    } else if (specialChars.test(account.username)) {
      errorMsg.username =
        "Username must not contain any special characters or spaces";
      isValid = false;
    } else if (account.username.length < 12) {
      errorMsg.username = "Username must be at leat 12 characters long";
      isValid = false;
    }

    if (account.password.trim() === "") {
      errorMsg.password = "Password is required";
      isValid = false;
    } else if (specialChars.test(account.password)) {
      errorMsg.password =
        "Password must not contain any special characters or spaces";
      isValid = false;
    } else if (account.password.length < 12) {
      errorMsg.password = "Password must be at leat 12 characters long";
      isValid = false;
    }
    // Add more rules for password and username format

    setErrors(errorMsg);

    if (isValid) {
      try {
        await saveCredential(account);
        toastSuccess("Successfully Created Account");
      } catch (error) {
        console.log(error);
        toastError(error);
      }

      setErrors({});

      console.log(account);

      setAccount({
        username: "",
        password: "",
        permission: "",
      });
    }
  };

  return (
    <form className="sign_up_form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        className="username"
        value={account.username.toLowerCase()}
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
