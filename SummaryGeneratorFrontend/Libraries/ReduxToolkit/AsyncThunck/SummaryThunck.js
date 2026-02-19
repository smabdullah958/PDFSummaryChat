import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL = process.env.NEXT_PUBLIC_BackendURL;
console.log(URL);
let SummaryThunck = createAsyncThunk(
  "summarythunck",
  async (formdata, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${URL}/SummaryRoute/`, formdata, {
        withCredentials: true,
      });
      console.log(response.data?.Summary);
      return response.data?.Summary;
    } catch (error) {
      console.log("internal error bro");
      return rejectWithValue(
        error.response?.data?.errorMessage || "Try Again after 24 hours",
      );
    }
  },
);
export default SummaryThunck;
