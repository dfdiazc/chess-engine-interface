"use client";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "@/lib/features/auth/authApiSlice";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();
  interface RegisterFormData {
    username: string;
    password: string;
    confirmPassword: string;
  }
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .email("Please enter a valid email.")
          .required("Email is required."),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters.")
          .required("Password is required."),
        confirmPassword: yup.string().test({
          name: "password-confirmation",
          message: "Passwords don't match.",
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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema) as any,
  });
  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    try {
      const response = await registerUser({
        username: data.username,
        password: data.password,
      }).unwrap();
      localStorage.setItem("username", response.username)
      router.push("/login");
      } catch (error: any) {
      const errors = error.data;
      if (errors.username) {
        setError("username", {
          type: "server",
          message: errors.username[0],
          
        })
      }
      else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password[0],
        });
      }
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
        {errors.username && (
          <p className="font-roboto font-normal text-md text-red-600">
            {errors.username.message}
          </p>
        )}
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          id="password"
          autoComplete="new-password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="font-roboto font-normal text-md text-red-600">
            {errors.password.message}
          </p>
        )}
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="font-roboto font-normal text-md text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex mt-10">
        <button
          type="submit"
          className="select-none grow whitespace-nowrap text-xl text-white font-roboto font-medium p-3 bg-flamingo-100 rounded-lg border-b-4 border-flamingo-200 transition duration-300 hover:bg-flamingo-200 hover:border-flamingo-300 hover:shadow text-center"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
