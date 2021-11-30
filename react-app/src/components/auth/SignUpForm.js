import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "../Home/HomePage.css";
import { authenticate } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async e => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, username, email, password));
      if (data) {
        setErrors(data);
      }
    }
    await dispatch(authenticate());
  };

  const updateUsername = e => {
    setUsername(e.target.value);
  };

  const updateName = e => {
    setName(e.target.value);
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = e => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div id="signupContainer">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <input
          className={"signupInput"}
          placeholder="Your Name"
          type="text"
          name="name"
          onChange={updateName}
          value={name}
        ></input>

        <input
          className={"signupInput"}
          placeholder="Your Username"
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>

        <input
          className={"signupInput"}
          placeholder="Your Email"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>

        <input
          className={"signupInput"}
          placeholder="Password"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>

        <input
          className={"signupInput"}
          placeholder="Repeat Password"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>

        <button id="askQuestionButton" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
