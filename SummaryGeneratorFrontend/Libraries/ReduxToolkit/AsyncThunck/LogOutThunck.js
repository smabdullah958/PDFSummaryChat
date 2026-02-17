"use client";
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/CheckLoginThunck";
import { resetLoginState } from "../Slices/LogInSlice";

let URL = process.env.NEXT_PUBLIC_BackendURL;
let LogOutThunck = createAsyncThunk(
  "thunck",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${URL}/AuthRoute/LogOutAuth`,
        {},
        { withCredentials: true },
      );
      console.log("logout successfully");

      await dispatch(CheckLogIn()).unwrap();
      dispatch(resetLoginState());
      return response.data;
    } catch (error) {
      console.log("internal error bro", error);
      return rejectWithValue(
        error.response?.data?.message || "plz try again later",
      );
    }
  },
);
export default LogOutThunck;
