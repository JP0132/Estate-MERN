import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-100 w-1/3 mt-10 rounded-lg shadow-lg p-5">
        <div className="flex items-end justify-end">
          <span className="font-semibold text-red-700 cursor-pointer">Logout</span>
        </div>
        <div className="flex items-center justify-center pt-10 flex-col">
          <img src={currentUser.avatar} className="rounded-full w-32" />
          <h1 className="text-gray-800 font-semibold text-xl mt-5">
            {currentUser.username}
          </h1>
          <h1 className="text-gray-500 text-sm">{currentUser.email}</h1>
        </div>
        <div className="flex flex-col p-4 items-end">
          <h1 className="text-xs uppercase font-semibold text-gray-800">Date Joined</h1>
          <h1 className="text-xs text-gray-500">{currentUser.createdAt}</h1>
        </div>
        <div className="flex items-center justify-center flex-col">
          <h1 className="uppercase text-gray-800 font-semibold text-lg mt-5">
            Update Account Details
          </h1>
          <form className="gap-4" action="">
            <input
              className="p-2 mt-4 rounded-xl border w-full"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
            />
            <input
              className="p-2 mt-4 rounded-xl border w-full"
              type="text"
              name="email"
              placeholder="Email"
              id="username"
            />
            <input
              className="p-2 mt-4 rounded-xl border w-full"
              type="text"
              name="password"
              placeholder="Password"
              id="password"
            />
            <button className="text-lg mt-4 uppercase text-white bg-slate-700 rounded-lg p-2 w-full border-none outline-none">
              Update Profile
            </button>
          </form>
        </div>
        <div className="float-right mt-2">
          <span className="cursor-pointer text-red-700">Delete Account</span>
        </div>
      </div>
    </div>
  );
}
