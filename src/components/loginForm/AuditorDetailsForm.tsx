import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./LoginForm.style.css";
import userIconGray from "../../assets/icons/user-icon-gray.svg";
import githubIconGray from "../../assets/icons/github-icon-gray.svg";
import twitterIconGray from "../../assets/icons/twitter-icon-gray.svg";
import companyIconGray from "../../assets/icons/company-icon-gray.svg";
import emailIconGray from "../../assets/icons/email-icon-gray.svg";
import sherlockIcon from "../../assets/icons/sherlock-icon.svg";
import backIcon from "../../assets/icons/right.svg";
type Inputs = {
  fullName: string;
  github: string;
  weeklyCost: string;
  twitter: string;
  sherlock: string;
  codeArena: string;
  inviteCode: string;
};

const AuditorDetailsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
                className="input__icons__gray"
              />
            </div>
          </div>
          <div>
            <label className="details__form__label">GitHub</label>
            <div className="input__field__container">
              <input
                {...register("github", { required: true })}
                placeholder="eg. bytebreach"
                className="input__field"
              />
              <img
                src={githubIconGray}
                alt="input_field"
                className="input__icons__gray"
              />
            </div>
          </div>

          <div>
            <label className="details__form__label">Weekly Cost</label>
            <div className="input__field__container">
              <input
                {...register("weeklyCost", { required: true })}
                placeholder="eg. 500$"
                className="input__field"
              />
            </div>
          </div>

          <div>
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
          </div>
          <div className="flex__input__container">
            <div className="flex__input__container-div">
              <label className="details__form__label">Sherlock</label>
              <div className="input__field__container">
                <input
                  {...register("sherlock")}
                  placeholder="eg. bytebreach"
                  className="input__field"
                />
                <img
                  src={sherlockIcon}
                  alt="input_field"
                  className="input__icons__gray"
                  style={{ transform: "translateY(100%)" }}
                />
              </div>
            </div>
            <div className="flex__input__container-div">
              <label className="details__form__label">CodeArena</label>
              <div className="input__field__container">
                <input
                  {...register("codeArena")}
                  placeholder="eg. bytebreach"
                  className="input__field"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="details__form__label">Invite Code</label>
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

export default AuditorDetailsForm;
