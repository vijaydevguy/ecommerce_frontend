import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";

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

  const [visible, setVisible] = useState(false);
  // console.log(visible);

  const { showSearch, setShowSearch , getCartCount} = useContext(ShopContext);
  // console.log("cartCnt",getCartCount());
  // console.log("showsearch", showSearch)

  return (
    <div className=" flex items-center justify-between py-5 font-medium">
      <NavLink to={"/"} className="w-fit">
        <img
          src={assets.logo}
          alt="logo"
          className="h-[42px] pointer-events-none lg:block hidden"
        />

        <img
          src={assets.logo_mob}
          alt="logo"
          className="block lg:hidden min-w-[32px]"
        />
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
          className="w-5 cursor-pointer min-w-[22px] min-h-[22px]"
          onClick={() => setShowSearch(!showSearch)}
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer min-w-[20px] min-h-[20px]"
          />

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-[4px]">
              <p className="cursor-pointer hover:text-black">My profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="cart"
            className="w-5 min-w-5 cursor-pointer pointer-events-none min-w-[20px] min-h-[20px]"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            {/* 10 */}
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(!visible)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Overlay */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[1px]"
        ></div>
      )}

      {/* mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[60%] bg-white z-20 transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600 px-[5%] gap-4">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center justify-end gap-4 p-3  mt-4"
          >
            {/* <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180 "
            />
            <p>Back</p> */}

            <IoCloseCircle size={32} className="text-red-700" />
          </div>

          {menu.map((m, i) => (
            <NavLink
              key={i}
              to={m.link}
              className={"flex flex-col w-fit gap-1"}
            >
              <p
                className={`${
                  location.pathname == m.link ? "" : "text-gray-400"
                }`}
              >
                {m.label}
              </p>

              <hr
                className={`w-2/4 border-none h-[1.5px] ${
                  location.pathname == m.link ? "bg-gray-700 " : ""
                } `}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
