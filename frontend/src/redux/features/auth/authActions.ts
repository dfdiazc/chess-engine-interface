import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async( username, password ) => {
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
