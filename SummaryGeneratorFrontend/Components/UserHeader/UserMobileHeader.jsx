"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogIn from "../Buttons/LogIn";
import LogOut from "../Buttons/LogOut";
import { ClearState } from "@/Libraries/ReduxToolkit/Slices/ChatPDFSlice";
import { clearState } from "@/Libraries/ReduxToolkit/Slices/PDFSlice";
import { useDispatch } from "react-redux";

const AdminMobileHeader = () => {
  let dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  let closeMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 300);
    dispatch(clearState());
    dispatch(ClearState());
  };

  return (
    <header className="md:hidden bg-[#92c7f2] shadow-lg ">
      {/* Top bar with logo + burger */}
      <div className=" px-6 flex items-center justify-between h-16">
        {/* Burger button */}
        {showMenu ? (
          //CROSS ICON
          <span className="mr-5">
            <button onClick={() => setShowMenu(false)}>
              <span className="absolute w-6 h-[2px] bg-white rotate-45 "></span>
              <span className="absolute w-6 h-[2px] bg-white -rotate-45"></span>
            </button>
          </span>
        ) : (
          <button
            onClick={() => setShowMenu(true)}
            className="focus:outline-none"
          >
            <Image src="/burger.webp" alt="menu" width={30} height={30} />
          </button>
        )}
        <div>
          <LogOut />
          <LogIn />
        </div>
      </div>

      {/* Slide-down menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-[#92c7f2] shadow-md z-50 animate-slideDown">
          <nav className="flex flex-col gap-4 p-6 text-lg font-medium">
            <Link
              onClick={closeMenu}
              href="/UserDashboard"
              className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
            >
              📄 Documents
            </Link>
            <Link
              onClick={closeMenu}
              href="/UserDashboard/AskQuestions"
              className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
            >
              ❓ Ask Questions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminMobileHeader;
