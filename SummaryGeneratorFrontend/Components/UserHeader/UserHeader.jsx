"use client";
import React from "react";
import Link from "next/link";
import LogIn from "../Buttons/LogIn";
import LogOut from "../Buttons/LogOut";
import { ClearState } from "@/Libraries/ReduxToolkit/Slices/ChatPDFSlice";
import { clearState } from "@/Libraries/ReduxToolkit/Slices/SummarySlice";
import { useDispatch } from "react-redux";
const AdminSidebar = () => {
  let dispatch = useDispatch();
  return (
    <aside className="hidden fixed  top-0 h-20 w-full 2xl:w-96 bg-[#92c7f2] shadow-xl md:flex justify-between z-70">
      {/* ===== Navigation ===== */}
      <nav className="flex justify-center items-center  gap-4 px-6 text-lg font-medium">
        <Link
          href="/UserDashboard"
          onClick={() => {
            dispatch(clearState());
            dispatch(ClearState());
          }}
          className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
        >
          📄 Documents
        </Link>

        <Link
          onClick={() => {
            dispatch(clearState());
            dispatch(ClearState());
          }}
          href="/UserDashboard/AskQuestions"
          className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
        >
          ❓ Ask Questions
        </Link>
      </nav>

      {/* ===== Auth Buttons ===== */}
      <div className=" justify-center flex flex-col gap-2">
        <LogIn />
        <LogOut />
      </div>
    </aside>
  );
};

export default AdminSidebar;
