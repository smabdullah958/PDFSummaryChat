import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL = process.env.NEXT_PUBLIC_BackendURL;
console.log(URL);
let ChatThunck = createAsyncThunk(
  "chatthunck",
  async (FormData, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${URL}/PDFChat/`, FormData, {
        withCredentials: true,
      });
      console.log(response.data?.ChatId);
      return response.data;
    } catch (error) {
      console.log("internal error bro");
      return rejectWithValue(
        error.response?.data?.errorMessage || "Try Again after 24 hours",
      );
    }
  },
);
export default ChatThunck;
