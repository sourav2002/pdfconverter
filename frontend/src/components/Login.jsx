import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/admin")
    console.log("LoggedIn");
  };
  return (
    <div className=" min-h-screen bg-slate-200 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <span className="border text-4xl text-yellow-800 px-6 pt-10 pb-8 bg-white w-1/2 max-w-md mx-auto rounded-t-md sm:px-10">
        Login Form
      </span>
      <div className="border relative px-4 pt-7 pb-8 bg-white shadow-xl w-1/2 max-w-md mx-auto sm:px-10 rounded-b-md">
      <p className="mb-4 text-red-500">Login with any id pass.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="" className="block">
            Email
          </label>
          <input
            type="Email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border w-full h-10 px-3 mb-5 rounded-md"
            placeholder="Email"
          />
          <div className="relative flex"></div>
          <label className="block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full h-10 px-3 mb-5 rounded-md"
            placeholder="password"
          />
          <button
            type="submit"
            className="mt-5 bg-green-500 hover:bg-blue-700 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
