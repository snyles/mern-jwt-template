import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import authService from '../../services/authService'
import useForm from "../../lib/useForm";

export default function LoginPage({handleSignupOrLogin}) {
  const {inputs, handleChange} = useForm({
    email: "",
    pw: "",
  });
  const {email, pw} = inputs;

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(inputs);
      handleSignupOrLogin();
      history.push("/");
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert(err.message);
    }
  };

  return (
    <main className="loginForm">
      <h3>Log In</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={pw}
          name="pw"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <button className="btn green">Log In</button>&nbsp;&nbsp;&nbsp;
        <Link className="btn red" to="/">
          Cancel
        </Link>
      </form>
    </main>
  );
}
