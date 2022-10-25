import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://unrealchess.pythonanywhere.com/users/";

interface UserAttributes {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, password }: UserAttributes) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BASE_URL + "register",
        { username, password },
        config
      );
    } catch (error) {
      console.log(error);
    }
  }
);
