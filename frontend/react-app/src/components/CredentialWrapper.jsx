import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

/**
 * This component renders the log in and sign up form, with a button to toggle between them.
 *
 * @returns {ReactNode} A React element that renders the log in and sign up pages.
 */
function CredentialWrapper() {
  const [toggleSignUp, setToggleSignUp] = useState(false);
  return (
    <div className="credential_wrapper">
      {toggleSignUp ? (
        <div>
          <h1 className="title">Sign up</h1>
          <SignUpForm />
          <button
            type="button"
            className="toggle_button"
            onClick={() => setToggleSignUp(!toggleSignUp)}
          >
            Have an account? Log in!
          </button>
        </div>
      ) : (
        <div>
          <h1 className="title">Log in</h1>
          <LogInForm />
          <button
            type="button"
            className="toggle_button"
            onClick={() => setToggleSignUp(!toggleSignUp)}
          >
            Don't have an account? Sign Up Now!
          </button>
        </div>
      )}
    </div>
  );
}

export default CredentialWrapper;
