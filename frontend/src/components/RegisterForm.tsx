import React, { useState } from "react";
import axios from 'axios';

const RegisterForm = () => {
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
    axios.post<response>('https://unrealchess.pythonanywhere.com/users/create', user)
    .then((response) => {
      setResponse(response.data)
      console.log(response.data)
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
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          placeholder="E-mail or Username"
          value={user.username}
          onChange={(e) => onChangeHandler(e.target)}
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => onChangeHandler(e.target)}
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          name="confirm-password"
          id="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          value={user.password}
          onChange={(e) => onChangeHandler(e.target)}
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
