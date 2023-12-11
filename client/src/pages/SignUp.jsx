import React from "react";
import LoginImage from "../assets/login.jpg";
import { FaEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-blue-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <div className="sm:w-1/2 px-8 ">
            <h2 className="font-bold text-2xl text-blue-900">Sign Up</h2>
            <p className="text-sm mt-4 text-blue-900">Sign up now!</p>

            <form className="flex flex-col gap-4" action="">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                className="p-2 rounded-xl border"
                type="text"
                name="email"
                placeholder="Email"
              />
              <div className="relative ">
                <input
                  className="p-2 w-full rounded-xl border"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <FaEye className="text-blue-900 absolute top-1/2 right-3 -translate-y-1/2" />
              </div>
              <button className="bg-slate-700 text-white py-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80">
                Sign Up
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="py-2 w-full mt-5 flex justify-center items-center text-sm bg-white rounded-xl border">
              <FaGoogle className="text-blue-900 text-xl mr-3" /> Login with Google
            </button>

            <hr className="mt-5 border-gray-500" />
            <div className="mt-3 text-xs flex justify-between items-center">
              <p className="mr-5 sm:mr-0">Already have an account...</p>
              <Link to={"/login"}>
                <button className="py-2 px-5 bg-white rounded-xl border">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className="w-1/2 sm:block hidden">
            <img className="rounded-2xl" src={LoginImage} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
