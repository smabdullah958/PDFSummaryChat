import React from "react";
import Link from "next/link";
import LogIn from "../Buttons/LogIn";
import LogOut from "../Buttons/LogOut";

const AdminSidebar = () => {
  return (
    <aside className="hidden  fixed left-0 top-0 h-screen w-64 bg-[#92c7f2] shadow-xl md:flex flex-col justify-between z-70">
      {/* ===== Logo / Title ===== */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-white">PDF Summary</h1>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex flex-col gap-4 px-6 text-lg font-medium">
        <Link
          href="/UserDashboard"
          className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
        >
          📄 Documents
        </Link>

        <Link
          href="/UserDashboard/AskQuestions"
          className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
        >
         ❓ Ask Questions
        </Link>
      </nav>

      {/* ===== Auth Buttons ===== */}
      <div className="px-6 py-6 flex flex-col gap-2">
        <LogIn />
        <LogOut />
      </div>
    </aside>
  );
};

export default AdminSidebar;
