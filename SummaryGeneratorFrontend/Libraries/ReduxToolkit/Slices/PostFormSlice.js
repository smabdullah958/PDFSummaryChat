"use client";
import PostFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/SignUpThunck";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  Loading: false,
  error: [],
  success: false,
  Errormessage: "",
  Role: "",
};

let PostFormSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    resetSignUpState: (state) => {
      state.Loading = false;
      state.error = [];
      state.success = false;
      state.Errormessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostFormThunck.pending, (state) => {
        state.Loading = true;
        state.error = null;
        state.success = false;
        state.Errormessage = null;
      })
      .addCase(PostFormThunck.fulfilled, (state, action) => {
        state.Loading = false;
        state.error = null;
        state.success = true;
        state.Errormessage = null;
        state.Role = action.payload; //here in a payload the role is come form a backend
      })
      .addCase(PostFormThunck.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload;
        state.success = false;
        state.Errormessage = action.payload;
      });
  },
});

export let { resetSignUpState } = PostFormSlice.actions;
export default PostFormSlice.reducer;
