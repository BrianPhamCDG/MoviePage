import React from "react";
import { BiSearch, BiBell, BiCaretDown } from "react-icons/bi";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <header className="nav-wrapper flex flex-row items-center w-full h-full page-container">
      <div className="nav-1 flex w-full h-full items-start gap-6">
        <div className="nav-search py-3 px-5 rounded-full flex items-center gap-3 bg-[#161616] w-full max-w-[240px] cursor-pointer">
          <button className="nav-icon-search w-[32px] h-[32px] bg-[#181818] rounded-full flex items-center justify-center">
            <BiSearch className="text-2xl text-white" />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full bg-transparent outline-none text-white"
          />
        </div>
        <div className="nav-category flex items-center justify-center gap-6 h-full">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-white" : "")}
          >
            All
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "text-white" : "")}
          >
            Movies
          </NavLink>
        </div>
      </div>

      <div className="nav-2 left-auto flex flex-row gap-7">
        <div className="nav-icon-search  rounded-full flex items-center justify-center cursor-pointer">
          <BiBell className="text-2xl text-white"></BiBell>
        </div>
        <div className="nav-user flex flex-row gap-3 items-center cursor-pointer">
          <div className="nav-user-wrap w-[40px] h-[40px]">
            <img
              src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              alt=""
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="user-profile-wrap flex row-auto items-center gap-1">
            <div className="name text-base text-white">Mike</div>
            <BiCaretDown className="text-sm text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
