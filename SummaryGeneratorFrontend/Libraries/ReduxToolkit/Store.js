"use client";
import { configureStore } from "@reduxjs/toolkit";
import LogInSlice from "@/Libraries/ReduxToolkit/Slices/LogInSlice";
import SignUpSlice from "@/Libraries/ReduxToolkit/Slices/SignUpSlice";
import CheckLogInSlice from "@/Libraries/ReduxToolkit/Slices/CheckLogInSlice";
import LogOutSlice from "@/Libraries/ReduxToolkit/Slices/LogOutSlice";
import SummarySlice from "@/Libraries/ReduxToolkit/Slices/SummarySlice";
import ChatSlice from "@/Libraries/ReduxToolkit/Slices/ChatPDFSlice";
export const store = configureStore({
  reducer: {
    LogInSlice,
    SignUpSlice,
    CheckLogInSlice,
    LogOutSlice,
    SummarySlice,
    ChatSlice,
  },
});
