import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const LoginForm = () => {
  interface user {
    username: string;
    password: string;
  }
  interface response {
    response: string | "No Response";
  }
  let initialState: user = {
    username: "",
    password: "",
  };
  const [user, setUser] = useState<user>(initialState);
  const [response, setResponse] = useState<response>();
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post<response>('https://unrealchess.pythonanywhere.com/users/login', user)
    .then((response) => {
      setResponse(response.data)
      console.log(response.data)
      localStorage.setItem("tokens", JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const onChangeHandler = (event: HTMLInputElement) => {
    const {name, value} = event
      setUser((prev) => {
        return {...prev, [name]: value}
      })
  }
  return (
    <form onSubmit={submitForm}>
      <div className="flex flex-col gap-5">
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md translate-x-0"
          type="email"
          name="username"
          id="username"
          placeholder="E-mail"
          value={user.username}
          onChange={(e) => onChangeHandler(e.target)}
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => onChangeHandler(e.target)}
          required
        ></input>
      </div>
      <div className="flex justify-between items-center mt-3">
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
      </div>
      <div className="flex mt-10">
        <button
          type="submit"
          className="select-none grow whitespace-nowrap text-xl text-white font-roboto font-medium p-3 bg-blue-400 rounded-lg border-b-4 border-blue-500 transition duration-300 hover:bg-blue-400/80 hover:border-blue-500/80 hover:shadow text-center"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
