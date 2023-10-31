import React, { useState } from "react";
import AuditorLoginForm from "../../components/login/AuditorLoginForm";
import ClientLoginForm from "../../components/login/ClientLoginForm";
import "./Login.style.css";
import backgroundImg from "../../assets/images/hero-image.png";
import overlayImg from "../../assets/images/Ellipse3.svg";
const Login = () => {
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
  const [loginFormVersion, setLoginFormVersion] = useState("client");

  const handleToggle = (event: any) => {
    const version = event.target.getAttribute("data-version");
    setLoginFormVersion(version);
  };
  return (
    <main>
      <div className="login__container">
        <div className="login__form__container">
          <div className="login__form__toggle__container">
            <div
              className={`login__form__toggle__div ${
                loginFormVersion === "client" ? "active" : ""
              } left`}
              onClick={handleToggle}
              data-version="client"
            >
              Client
            </div>
            <div
              className={`login__form__toggle__div ${
                loginFormVersion === "auditor" ? "active" : ""
              } right`}
              onClick={handleToggle}
              data-version="auditor"
            >
              Auditors
            </div>
          </div>
          <div className="login__form">
            {loginFormVersion === "client" ? (
              <ClientLoginForm />
            ) : (
              <AuditorLoginForm />
            )}
          </div>
        </div>
        <div className="login__image__container">
          <div className="login__image__overlay__div">
            <img src={overlayImg} alt="overlay_background_image" />
            <p>ByteBreach</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
