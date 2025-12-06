import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const menu = [
  {
    label: "HOME",
    link: "/",
  },
  {
    label: "COLLECTION",
    link: "/collection",
  },
  {
    label: "ABOUT",
    link: "/about",
  },
  {
    label: "CONTACT",
    link: "/contact",
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <NavLink to={"/"} className="w-fit">
        <img src={assets.logo} alt="logo" className="h-[54px] pointer-events-none" />
      </NavLink>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menu.map((m, i) => (
          <NavLink
            key={i}
            to={m.link}
            className={"flex flex-col items-center gap-1"}
          >
            <p
              className={`${
                location.pathname == m.link ? "" : "text-gray-400"
              }`}
            >
              {m.label}
            </p>
            {location.pathname == m.link && (
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-[4px]">
              <p className="cursor-pointer hover:text-black">My profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
