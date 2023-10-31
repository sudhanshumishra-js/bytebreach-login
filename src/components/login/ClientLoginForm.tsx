import React, { useState } from "react";
import "./Login.style.css";
import googleIcon from "../../assets/icons/google-icon.svg";
import emailIcon from "../../assets/icons/email-icon-gray.svg";

const ClientLoginForm = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const handleChange = (event: any) => {
    setEmail(event.target.value);
    props.handleEmailChange(event.target.value);
  };
  const handleClick = (event: any) => {
    event.preventDefault();
    props.handleSocialLogin(event);
  };
  return (
    <>
      <button
        className="social__login__button"
        name="google"
        onClick={handleClick}
      >
        <img
          src={googleIcon}
          alt="google__icon"
          className="social__login__icon"
        />
        <span> Login using your Google Account</span>
      </button>
      <div className="line--gray"></div>
      <div className="input__container">
        <label htmlFor="emailInput">Email</label>
        <div className="input__field__container">
          <input
            type={"text"}
            value={email}
            onChange={handleChange}
            className="input__field"
            id="emailInput"
            aria-label="emailInput"
            autoComplete="email"
            placeholder="Email address"
          />
          <img
            src={emailIcon}
            className="input__icons__gray"
            alt="email_icon"
          />
        </div>
      </div>
      <button className="submit__button">Submit</button>
    </>
  );
};

export default ClientLoginForm;
