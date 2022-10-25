import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const BASE_URL = "http://unrealchess.pythonanywhere.com/"

interface UserAttributes {
  username: string,
  password: string,
}

export const registerUser = createAsyncThunk(
  "user/register",
  async( {username, password }: UserAttributes ) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }
        await axios.post(
            "api/user/register",
            { username, password },
            config,
        )
    }
    catch (error) {
      console.log(error);
    }
  }
);
