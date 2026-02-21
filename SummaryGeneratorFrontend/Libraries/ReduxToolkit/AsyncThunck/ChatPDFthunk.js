import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL = process.env.NEXT_PUBLIC_BackendURL;
let ChatThunck = createAsyncThunk(
  "chatthunck",
  async (FormData, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${URL}/PDFChat/`, FormData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errorMessage || "Try Again after 24 hours",
      );
    }
  },
);
export default ChatThunck;
