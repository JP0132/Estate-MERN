import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // Using the header tag for SEO purposes
    <header className="bg-blue-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-400">JP</span>
            <span className="text-blue-700">Estates</span>
          </h1>
        </Link>
        <form className="bg-blue-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-blue-500" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:text-blue-700">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:text-blue-700">
              About
            </li>
          </Link>
          <Link to="/login">
            <li className="text-slate-700 hover:text-blue-700">Login</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
