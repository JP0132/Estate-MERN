import React, { useState } from "react";
import LoginImage from "../assets/login.jpg";
import { FaEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

export default function LogIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Saving the data entered into the form each time a change occurs.
  // Spread operator used to keep all previous data when new data is entered.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Page will not refresh when submitting form.

    try {
      dispatch(signInStart());
      // Proxy is in vite.config.js
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
      // console.log(data);
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };
  return (
    <div className="mt-5">
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-blue-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <div className="sm:w-1/2 px-8 ">
            <h2 className="font-bold text-2xl text-blue-900">Login</h2>
            <p className="text-sm mt-4 text-blue-900">Login to your account!</p>

            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4"
              action=""
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
              <div className="relative ">
                <input
                  className="p-2 w-full rounded-xl border"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
                <FaEye className="text-blue-900 absolute top-1/2 right-3 -translate-y-1/2" />
              </div>
              <button
                disabled={loading}
                className="bg-slate-700 text-white py-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="py-2 w-full mt-5 flex justify-center items-center text-sm bg-white rounded-xl border">
              <FaGoogle className="text-blue-900 text-xl mr-3" /> Login with
              Google
            </button>

            <hr className="mt-5 border-gray-500" />
            <div className="mt-3 text-xs flex justify-between items-center">
              <p className="mr-5 sm:mr-0">Don't have an account...</p>
              <Link to={"/sign-up"}>
                <button className="py-2 px-5 bg-white rounded-xl border">
                  Sign Up
                </button>
              </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
          <div className="w-1/2 sm:block hidden">
            <img className="rounded-2xl" src={LoginImage} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
