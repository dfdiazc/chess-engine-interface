/* "use client";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useLoginMutation } from "@/lib/features/auth/authApiSlice";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  interface LoginFormData {
    username: string;
    password: string;
  }
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .email("Please enter a valid email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
      }),
    []
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema) as any,
  });
  const onSubmit = handleSubmit(async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));
      router.push("/play");
    } catch (error: any) {
        const errors = error.data;
        if (errors.detail) {
          setError("password", {
            type: "server",
            message: errors.detail + ".",
            
          })
        }
      }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-5">
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md translate-x-0"
          type="email"
          id="username"
          autoComplete="username"
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
          autoComplete="current-password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="font-roboto font-normal text-md text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>
      {/*<div className="flex justify-between items-center mt-3">
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 mt-1 float-left mr-2 cursor-pointer"
            id="checkbox"
          />
          <label
            className="select-none whitespace-nowrap font-roboto font-normal text-sm form-check-label inline-block text-gray-800"
            htmlFor="checkbox"
          >
            Remember me
          </label>
        </div>
        <Link
          to="/login"
          className="select-none whitespace-nowrap font-roboto font-normal text-blue-500 text-sm hover:underline duration-200 transition ease-in-out"
        >
          Forgot password?
        </Link>
        </div>*
      <div className="flex mt-10">
        <button
          type="submit"
          className="select-none grow whitespace-nowrap text-xl text-white font-roboto font-medium p-3 bg-flamingo-100 rounded-lg border-b-4 border-flamingo-200 transition duration-300 hover:bg-flamingo-200 hover:border-flamingo-300 hover:shadow text-center"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
 */