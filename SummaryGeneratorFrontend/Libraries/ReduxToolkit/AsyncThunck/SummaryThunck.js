import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL = process.env.NEXT_PUBLIC_BackendURL;
let SummaryThunck = createAsyncThunk(
  "summarythunck",
  async (formdata, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${URL}/SummaryRoute/`, formdata, {
        withCredentials: true,
      });
      return response.data?.Summary;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errorMessage || "Try Again after 24 hours",
      );
    }
  },
);
export default SummaryThunck;
