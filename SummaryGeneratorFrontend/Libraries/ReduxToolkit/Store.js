"use client";
import { configureStore } from "@reduxjs/toolkit";
import LogInSlice from "@/Libraries/ReduxToolkit/Slices/LogInSlice";
import PostFormSlice from "@/Libraries/ReduxToolkit/Slices/PostFormSlice";
import CheckLogInSlice from "@/Libraries/ReduxToolkit/Slices/CheckLogInSlice";
import LogOutSlice from "@/Libraries/ReduxToolkit/Slices/LogOutSlice";
import PDFSlice from "@/Libraries/ReduxToolkit/Slices/PDFSlice";
import ChatSlice from "@/Libraries/ReduxToolkit/Slices/ChatPDFSlice";
export const store = configureStore({
  reducer: {
    LogInSlice,
    PostFormSlice,
    CheckLogInSlice,
    LogOutSlice,
    PDFSlice,
    ChatSlice,
  },
});
