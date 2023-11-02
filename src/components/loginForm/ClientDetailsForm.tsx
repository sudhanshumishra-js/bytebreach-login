import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./LoginForm.style.css";
import userIconGray from "../../assets/icons/user-icon-gray.svg";
import twitterIconGray from "../../assets/icons/twitter-icon-gray.svg";
import companyIconGray from "../../assets/icons/company-icon-gray.svg";
import githubIcon from "../../assets/icons/github-icon-gray.svg";
import backIcon from "../../assets/icons/right.svg";
import { useNavigate } from "react-router-dom";
type Inputs = {
  fullName: string;
  companyName: string;
  website: string;
  twitter: string;
  github: string;
  codeArena: string;
  inviteCode: string;
};

const ClientDetailsForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => navigate("/dashboard");

  return (
    <>
      <img src={backIcon} className="back__icon" />
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <h3 className="details__form__heading">Contact Details</h3>
        <p className="details__form__subheading">Enter your details to login</p>
        <div className="line--gray"></div>
        <div className="input__container">
          <div>
            <label
              className={`details__form__label ${
                errors.fullName ? "error" : ""
              }`}
            >
              Full Name
            </label>
            <div className="input__field__container">
              <input
                {...register("fullName", { required: true })}
                placeholder="John Carter"
                className="input__field"
              />
              <img
                src={userIconGray}
                alt="input_field"
                className="input__icons__gray-50"
              />
            </div>
          </div>
          <div>
            <label
              className={`details__form__label ${
                errors.companyName ? "error" : ""
              }`}
            >
              Company Name
            </label>
            <div className="input__field__container">
              <input
                {...register("companyName", { required: true })}
                placeholder="Your Company Name"
                className="input__field"
              />
              <img
                src={companyIconGray}
                alt="input_field"
                className="input__icons__gray-50"
              />
            </div>
          </div>

          <div>
            <label className="details__form__label">Website</label>
            <div className="input__field__container">
              <input
                {...register("website")}
                placeholder="Your Website"
                className="input__field"
              />
            </div>
          </div>

          {/* <div>
            <label className="details__form__label">Twitter</label>
            <div className="input__field__container">
              <input
                {...register("twitter")}
                placeholder="eg. bytebreach"
                className="input__field"
              />
              <img
                src={twitterIconGray}
                alt="input_field"
                className="input__icons__gray"
              />
            </div>
          </div> */}
          <div className="flex__input__container">
            <div className="flex__input__container-div">
              <label className="details__form__label">Twitter</label>
              <div className="input__field__container">
                <input
                  {...register("twitter")}
                  placeholder="eg. bytebreach"
                  className="input__field"
                />
                <img
                  src={twitterIconGray}
                  alt="input_field"
                  className="input__icons__gray-50"
                />
              </div>
            </div>
            <div className="flex__input__container-div">
              <label className="details__form__label">Github</label>
              <div className="input__field__container">
                <input
                  {...register("github")}
                  placeholder="eg. bytebreach"
                  className="input__field"
                />
                <img
                  src={githubIcon}
                  alt="input_field"
                  className="input__icons__gray-50"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              className={`details__form__label ${
                errors.inviteCode ? "error" : ""
              }`}
            >
              Invite Code
            </label>
            <div className="input__field__container">
              <input
                {...register("inviteCode", { required: true })}
                placeholder="1234"
                className="input__field"
              />
            </div>
          </div>

          <button className="submit__button">Submit</button>
        </div>
      </form>
    </>
  );
};

export default ClientDetailsForm;
