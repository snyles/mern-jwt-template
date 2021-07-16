import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../../services/authService";
import useForm from "../../lib/useForm";
import styles from './SignupForm.module.css'

export default function SignupForm( {handleSignupOrLogin} ) {
  const {inputs, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  })
  const { name, email, password, passwordConf } = inputs;

  const [message, setMessage] = useState('')
  const history = useHistory();

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(inputs);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      history.push("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <h3>Sign Up</h3>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.signupForm}>
        <fieldset>
          {message && <p>{message}</p>}

          <label htmlFor="name">Name</label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            autoComplete="off"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
          <div>
            <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
            <button type="button" onClick={resetForm}>Reset</button>
            <button type="button" onClick={()=>history.push('/')}>Cancel</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
