import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const SignUpPage = () => (
  <div className="container">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const SignUpFormBase = ({ history, firebase }) => {
  const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
  };

  const [state, setState] = React.useState(INITIAL_STATE);
  const [isInvalid, setIsInValid] = React.useState(false);

  const onSubmit = event => {
    const { username, email, passwordOne } = state;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState({ ...state, error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    const isInvalid =
      state.passwordOne !== state.passwordTwo ||
      (state.passwordOne === "" && state.passwordOne.length < 5) ||
      state.email === "" ||
      state.username === "";
    setIsInValid(isInvalid);
  }, [state]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={state.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={state.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={state.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={state.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
