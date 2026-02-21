import React from "react";
import Link from "next/link";
import LogIn from "../Buttons/LogIn";
import LogOut from "../Buttons/LogOut";
const Header = () => {
  return (
    <header className=" sticky top-0 z-50">
      <div className=" hidden md:flex justify-between items-center md:h-20 bg-[#92c7f2] shadow-lg  mx-auto px-3 lg:px-6  h-16 2xl:h-24 ">
        {/* Navigation Links */}
        <nav className="flex gap-6 text-lg 2xl:text-4xl font-medium">
          <Link
            href="/"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/About"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/Feature"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Features
          </Link>
        </nav>

        <div className="flex gap-2">
          <LogOut />
          <LogIn />
        </div>
      </div>
    </header>
  );
};

export default Header;
