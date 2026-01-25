import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setLogin] = useState(true);

  const currentState = isLogin ? "Login" : "Sign Up";

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
          localStorage.setItem("token", res.data.token);
          toast.success("Sign up successfully");
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
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={(e) => onSubmitHandle(e)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 transition-all duration-300 ease-in-out"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 transition-all duration-300 ease-in-out"
        placeholder="Enter Password"
        required
      />

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
