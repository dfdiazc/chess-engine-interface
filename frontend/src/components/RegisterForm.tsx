import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { useRegisterMutation } from "features/auth/authApiSlice";
import { setCredentials } from "features/auth/authSlice";


const RegisterForm = () => {

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  interface RegisterFormData {
    username: string;
    password: string;
    confirmPassword: string;
  }
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string().test({
          name: "password-confirmation",
          message: "Passwords don't match",
          test: function () {
            const { password, confirmPassword } = this.parent;
            if (password && confirmPassword !== password) {
              return false;
            }
            return true;
          },
        }),
      }),
    []
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = handleSubmit(async (data:RegisterFormData) => {
    try {
      await registerUser({username:data.username, password:data.password});
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-5">
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="email"
          id="username"
          autoComplete="email"
          placeholder="E-mail"
          {...register("username")}
        />
        {errors.username && <p className="font-roboto font-normal text-md text-red-600">{errors.username.message}</p>}
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          id="password"
          autoComplete="new-password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="font-roboto font-normal text-md text-red-600">{errors.password.message}</p>}
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="font-roboto font-normal text-md text-red-600">{errors.confirmPassword.message}</p>}
      </div>
      <div className="flex mt-10">
        <button
          type="submit"
          className="select-none grow whitespace-nowrap text-xl text-white font-roboto font-medium p-3 bg-blue-400 rounded-lg border-b-4 border-blue-500 transition duration-300 hover:bg-blue-400/80 hover:border-blue-500/80 hover:shadow text-center"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
