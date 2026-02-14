"use client";
import ChatThunck from "@/Libraries/ReduxToolkit/AsyncThunck/ChatPDFthunk";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  Loading: false,
  Success: false,
  ErrorMessage: null,
  ChatID: null,
  ShowChat: null,
};

let ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,

  reducers: {
    ClearError: (state) => {
      state.ErrorMessage = null;
    },
    ClearState: (state) => {
      state.Loading = false;
      state.Success = false;
      state.ErrorMessage = null;
      state.ChatID = null;
      state.ShowChat = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChatThunck.pending, (state) => {
        state.Loading = true;
        state.Success = false;
        state.ErrorMessage = null;
        state.ChatID = null;
        state.ShowChat = null;
      })
      .addCase(ChatThunck.fulfilled, (state, action) => {
        state.Loading = false;
        state.Success = true;
        state.ErrorMessage = null;
        state.ChatID = action.payload?.ChatId; //get the chat id and it si come from a backend
        state.ShowChat = action.payload?.ShowChat; //ShowChat is come rom a backedn
      })
      .addCase(ChatThunck.rejected, (state, action) => {
        state.Loading = false;
        state.Success = false;
        state.ErrorMessage = action.payload;
      });
  },
});

export const { ClearError, ClearState } = ChatSlice.actions;
export default ChatSlice.reducer;
