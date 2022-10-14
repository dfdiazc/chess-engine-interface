import React, { useState, createContext } from 'react'

type authContextInterface = {
  user: string;
  accessToken: string;
  refreshToken: string;
  login: () => void;
  register: () => void;
}

const authContextDefaultValues: authContextInterface = {
  user: "",
  accessToken: "",
  refreshToken: "",
  login: () => {},
  register: () => {},
};

const AuthContext = createContext<AuthContextInterface | null>(authContextDefaultValues);

const AuthContext = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext