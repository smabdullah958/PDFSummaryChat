"use client";
import ChatPDFThunck from "@/Libraries/ReduxToolkit/AsyncThunck/ChatPDFthunk";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  Loading: false,
  success: false,
  errorMessage: "",
  ChatID: "",
  ShowChat: "",
};

let PDFSlice = createSlice({
  name: "slice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(ChatPDFThunck.pending, (state) => {
        state.Loading = true;
        state.success = false;
        state.errorMessage = null;
        state.ChatID = null;
        state.ShowChat = null;
      })
      .addCase(ChatPDFThunck.fulfilled, (state, action) => {
        state.Loading = false;
        state.success = true;
        state.errorMessage = null;
        state.ChatID = action.payload?.ChatId; //get the chat id and it si come from a backend
        state.ShowChat = action.payload?.ShowChat; //ShowChat is come rom a backedn
      })
      .addCase(ChatPDFThunck.rejected, (state, action) => {
        state.Loading = false;
        state.success = false;
        state.errorMessage = action.payload;
      });
  },
});

export default PDFSlice.reducer;
