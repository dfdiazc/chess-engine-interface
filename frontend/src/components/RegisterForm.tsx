import React from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formValue, setformValue] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async() => {
    const registerFormData = new FormData();
    registerFormData.append("email", formValue.email)
    registerFormData.append("password", formValue.password)

    try{
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/",
        data: registerFormData,
        headers: {"Content-Type": "multipart/form-data"}
      })
      console.log(registerFormData)
      console.log(response)
    }
    catch(error) {
      console.log(error)
    }
  };
  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="email"
          name="email"
          id="email"
          autoComplete="username"
          inputMode="email"
          placeholder="E-mail"
          value={formValue.email}
          onChange={handleChange}
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
          required
        ></input>
        <input
          className="grow border rounded p-2 focus:shadow-outline font-roboto font-normal text-md"
          type="password"
          name="confirm-password"
          id="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          value={formValue.password}
          onChange={handleChange}
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
