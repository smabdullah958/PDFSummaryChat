"use client";

import Loader from "@/Components/SummaryLoader";

import {
  HideLogIn,
  resetLoginState,
} from "@/Libraries/ReduxToolkit/Slices/LogInSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogInThunck from "@/Libraries/ReduxToolkit/AsyncThunck/LogInThunck";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  let route = useRouter();
  //LogInSlice is come from a store bro
  let { Loading, errorMessage, success, Role } = useSelector(
    (state) => state.LogInSlice,
  );
  let dispatch = useDispatch();
  let [Form, SetForm] = useState({
    Email: "",
    Password: "",
  });

  let HandleFields = (e) => {
    SetForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let CloseForm = () => {
    setTimeout(() => {
      dispatch(HideLogIn());
    }, 500);
  };

  let HandleButton = () => {
    dispatch(LogInThunck(Form));
  };

  useEffect(() => {
    if (success) {
      dispatch(HideLogIn());
      dispatch(resetLoginState());
      if (Role === "Admin" || Role === "User") {
        route.push("/UserDashboard");
      }
    }
  }, [success, dispatch]);

  return (
    <div className="bottom-52">
      {/* Card Container */}
      <div className="bg-blue-100 shadow-2xl rounded-2xl p-8 w-[90vw] sm:w-[350px] ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <span className="my-3 text-red-300">{errorMessage}</span>

        {/* Email Input */}
        <input
          type="email"
          placeholder="test@gmail.com"
          onChange={HandleFields}
          name="Email"
          value={Form.Email}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {/* Password Input */}
        <input
          type="password"
          placeholder="******"
          onChange={HandleFields}
          name="Password"
          value={Form.Password}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Button */}
        <button
          disabled={Loading}
          onClick={HandleButton}
          className={`w-full py-3 bg-[#67a1db] text-white font-semibold rounded-xl hover:bg-[#65a9ec] transition duration-300 shadow-md ${Loading ? "opacity-40" : "opacity-100"}`}
        >
          {Loading ? <Loader /> : "Login"}
        </button>

        {/* Extra Links */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Don’t have an account?{" "}
            <Link
              href="/SignUpForm"
              onClick={CloseForm}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
