import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import MuiAuthForm from "./muiAuthForm";
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const { text } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;

    if (formName === "signup") {
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      dispatch(
        authenticate({ email, password, firstName, lastName, method: formName })
      );
    } else {
      dispatch(authenticate({ email, password, method: formName }));
    }
  };

  let formInputs;
  if (name === "login") {
    formInputs = ["email", "password"];
  } else if (name === "signup") {
    formInputs = ["firstName", "lastName", "email", "password"];
  }
  return (
    <div>
      <MuiAuthForm
        handleSubmit={handleSubmit}
        name={name}
        displayName={displayName}
        formInputs={formInputs}
        error={error}
        helperText={text}
      />
    </div>
  );
};

export default AuthForm;
