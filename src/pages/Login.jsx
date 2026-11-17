import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLogin, setLogin] = useState(true);

  const currentState = isLogin ? "Login" : "Sign Up";

  const getPageTitle = (path) => {
    if (!path) return "your account";
    if (path.includes("cart")) return "your cart";
    if (path.includes("orders")) return "your orders";
    if (path.includes("place-order")) return "checkout";
    return path;
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    console.log(name, password, email);

    try {
      // signup
      if (currentState === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        console.log(res.data);

        if (res.data.success) {
          setToken(res.data.token);
          console.log(token, "tokenfromlogin");
          localStorage.setItem("token", res.data.token);
          toast.success("Sign up successfully");
          navigate(redirectTo, { replace: true });
        } else {
          toast.error(res.data.message);
        }
      }
      // login
      else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        console.log(res.data);

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Login successfully");
          navigate(redirectTo, { replace: true });
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(redirectTo, { replace: true });
    }
  }, [token]);

  return (
    <form
      onSubmit={(e) => onSubmitHandle(e)}
      autoComplete="on"
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 transition-all duration-300 ease-in-out"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {location.state?.from && (
        <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm px-4 py-2.5 rounded text-center">
          Please log in to continue to{" "}
          <span className="font-semibold">
            {getPageTitle(location.state.from)}
          </span>
          .
        </div>
      )}

      {isLogin ? (
        ""
      ) : (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 transition-all duration-300 ease-in-out"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 transition-all duration-300 ease-in-out"
        placeholder="Email"
        required
      />
      <div className="relative w-full flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 pr-10 border border-gray-800 transition-all duration-300 ease-in-out"
          placeholder="Enter Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-500 hover:text-gray-800 cursor-pointer focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:underline transition-colors duration-300 ease-in-out">
          Forget your password?
        </p>
        {isLogin ? (
          <p onClick={() => setLogin(!isLogin)} className="cursor-pointer ">
            Create an account
          </p>
        ) : (
          <p onClick={() => setLogin(!isLogin)} className="cursor-pointer ">
            Login
          </p>
        )}
      </div>

      <button
        type="submit"
        className="cursor-pointer bg-[#1E1E1E]
       text-white px-8 py-2 mt-4"
      >
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
