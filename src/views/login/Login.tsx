import React, { useContext, useEffect, useState } from "react";
import AuditorLoginForm from "../../components/login/AuditorLoginForm";
import ClientLoginForm from "../../components/login/ClientLoginForm";
import "./Login.style.css";
import backgroundImg from "../../assets/images/hero-image.png";
import overlayImg from "../../assets/images/Ellipse3.svg";
import { AuthContext } from "../../context/AuthContext";
import ClientDetailsForm from "../../components/loginForm/ClientDetailsForm";
import AuditorDetailsForm from "../../components/loginForm/AuditorDetailsForm";
const Login = () => {
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
  const [loginFormVersion, setLoginFormVersion] = useState("client");
  const [email, setEmail] = useState("");
  const [isClientLogin, setIsClientLogin] = useState(false);
  const [isAuditorLogin, setIsAuditorLogin] = useState(false);
  const {
    authState,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    loginWCModal,
    logout,
  } = useContext(AuthContext);

  const handleToggle = (event: any) => {
    const version = event.target.getAttribute("data-version");
    setLoginFormVersion(version);
  };
  const handleEmailChange = (email: string) => {
    setEmail(email);
  };
  const handleEmailLogin = (email: string) => {
    loginWithEmail(email);
  };
  const handleSocialLogin = (event: any) => {
    if (event.currentTarget.name === "google") {
      loginWithGoogle();
    }
  };

  useEffect(() => {
    if (authState.userData?.role && authState.userData?.role === "client") {
      setIsClientLogin(true);
      setIsAuditorLogin(false);
    } else {
      setIsClientLogin(false);
      setIsAuditorLogin(true);
    }
    console.log(
      "authState.isLoggedIn ",
      authState.isLoggedIn,
      "isLoginSubmitted ",
      isLoginSubmitted,
      "isClientLogin ",
      isClientLogin,
      "isAuditorLogin ",
      isAuditorLogin
    );
  }, [authState]);

  console.log(authState.isLoggedIn, isLoginSubmitted);
  return (
    <main>
      <div className="login__container">
        <div className="login__form__container">
          {!authState.isLoggedIn && (
            <>
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
                  <ClientLoginForm
                    handleEmailChange={handleEmailChange}
                    handleEmailLogin={handleEmailLogin}
                    handleSocialLogin={handleSocialLogin}
                  />
                ) : (
                  <AuditorLoginForm
                    handleEmailChange={handleEmailChange}
                    handleEmailLogin={handleEmailLogin}
                    handleSocialLogin={handleSocialLogin}
                  />
                )}
              </div>
            </>
          )}

          {isClientLogin ? <ClientDetailsForm /> : <AuditorDetailsForm />}
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
