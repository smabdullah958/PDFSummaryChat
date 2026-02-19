"use client";
import SummaryThunck from "@/Libraries/ReduxToolkit/AsyncThunck/SummaryThunck";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  Loading: false,
  success: false,
  errorMessage: null,
  Summary: null,
};

let SummarySlice = createSlice({
  name: "SummarySlice",
  initialState,

  reducers: {
    clearError: (state) => {
      state.errorMessage = null;
    },
    clearState: (state) => {
      state.Loading = false;
      state.success = false;
      state.errorMessage = null;
      state.Summary = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SummaryThunck.pending, (state) => {
        state.Loading = true;
        state.success = false;
        state.errorMessage = null;
        state.Summary = null;
      })
      .addCase(SummaryThunck.fulfilled, (state, action) => {
        state.Loading = false;
        state.success = true;
        state.errorMessage = null;
        state.Summary = action.payload; //get the summary
      })
      .addCase(SummaryThunck.rejected, (state, action) => {
        state.Loading = false;
        state.success = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearError, clearState } = SummarySlice.actions;
export default SummarySlice.reducer;
