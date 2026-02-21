import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DisplayLogOut } from "@/Libraries/ReduxToolkit/Slices/CheckLogInSlice";
let URL = process.env.NEXT_PUBLIC_BackendURL;
let PostFormThunck = createAsyncThunk(
  "SignUpthunck",
  async (UserData, { dispatch, rejectWithValue }) => {
    try {
      let response = await axios.post(`${URL}/AuthRoute/SignUpAuth`, UserData, {
        withCredentials: true,
      });
      dispatch(DisplayLogOut());
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "plz try again later",
      );
    }
  },
);
export default PostFormThunck;
