import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./LoginForm.style.css";
import "../login/Login.style.css";
type Inputs = {
  fullName: string;
  github: string;
  weeklyCost: string;
  twitter: string;
  sherlock: string;
  codeArena: string;
  inviteCode: string;
};

const ClientDetailsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <h3 className="details__form__heading">Contact Details</h3>
        <p className="details__form__subheading">Enter your details to login</p>
        <div>
          <label className="details__form__lable"></label>
          <div className="details__form__imput__container">
            <input {...register("fullName", { required: true })} />
          </div>
        </div>
      </form>
    </>
  );
};

export default ClientDetailsForm;
