import React from "react";

const RegisterForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-5">
        <input
          className="grow border rounded p-2 focus:shadow-outline"
          type="email"
          name="email"
          id="email"
          autoComplete="username"
          inputMode="email"
          placeholder="E-mail"
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          placeholder="Password"
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline"
          type="password"
          name="confirm-password"
          id="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          required
        ></input>
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
