import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import SignUpForm from "./SignUpForm";
import Modal from "../Modal/Modal";
import "../Home/HomePage.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async () => {
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={"mainLogin"}>
        <div id={"loginForm"}>
          <div id={"topLoginForm"}>
            <p id={"logo"} style={{ fontSize: "38pt", marginTop: "10px" }}>
              Coina
            </p>
            <p style={{ margin: "0px" }}>
              A place to discuss everything crypto!
            </p>
          </div>
          <form id={"bottomLoginForm"}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                className={"loginInput"}
                name="email"
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                className={"loginInput"}
                name="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div id={"loginButtons"}>
            <button id="askQuestionButton" onClick={onLogin}>
              Login
            </button>
            <button
              id="askQuestionButton"
              onClick={async e => {
                await dispatch(login("demo@aa.io", "password"));
              }}
            >
              Demo
            </button>
          </div>
          <p id={"signUpModalPrompt"} onClick={e => setModal(true)}>
            Sign up
          </p>
        </div>
      </div>
      <Modal title={`Sign up`} show={modal} onClose={() => setModal(false)}>
        <SignUpForm />
      </Modal>
    </>
  );
};
export default LoginForm;
