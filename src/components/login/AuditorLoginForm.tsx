import React, { useState } from "react";
import googleIcon from "../../assets/icons/google-icon.svg";
import emailIcon from "../../assets/icons/email-icon-gray.svg";
import githubIcon from "../../assets/icons/github-icon.svg";
import walletIcon from "../../assets/icons/wallet-icon.svg";
import "./Login.style.css";

const AuditorLoginForm = (props: any) => {
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
      <div className="auditor__form__button__container">
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
        <button
          className="social__login__button"
          name="github"
          onClick={handleClick}
        >
          <img
            src={githubIcon}
            alt="google__icon"
            className="social__login__icon"
          />
          <span> Login using your Github Account</span>
        </button>
        <button
          className="social__login__button"
          name="wallet"
          onClick={handleClick}
        >
          <img
            src={walletIcon}
            alt="google__icon"
            className="social__login__icon"
          />
          <span> Login using your Wallet</span>
        </button>
      </div>
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

export default AuditorLoginForm;
