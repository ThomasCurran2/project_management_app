import React, { useState } from "react";
import Sign_up_form from "./Sign_up_form";
import Log_in_form from "./Log_in_form";

/**
 * This component renders the log in and sign up form, with a button to toggle between them.
 *
 * @returns {ReactNode} A React element that renders the log in and sign up pages.
 */
function Credential_wrapper() {
  const [toggleSignUp, setToggleSignUp] = useState(false);
  return (
    <div className="credential_wrapper">
      {toggleSignUp ? (
        <div>
          <h1 className="title">Sign up</h1>
          <Sign_up_form />
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
          <Log_in_form />
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

export default Credential_wrapper;
