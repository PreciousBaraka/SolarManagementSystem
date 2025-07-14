import React, { useState } from "react";
import { images } from "../lib/constants";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error, loading, userInfo} = useSelector((state) => state.user)
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return;
    }
    dispatch(loginUser({email, password}))
  };

  useEffect(() => {
    if (userInfo){
      navigate("/dashboard")
    }
  }, [userInfo, navigate])

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={images.logo}
            alt="Solar Company Logo"
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Login to the Solar Management System
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-900 p-3 rounded mt-4">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <div className= "bg-green-700 text-white mt-4"> Loading ...</div>}

        {/* Form */}
        <form className="mt-8 space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>

        </form>

        {/* Extra Links */}
        <div className="mt-6 text-sm text-center text-gray-600 space-y-2">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
          <p>
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </p>
          <p>
            <a href="/" className="text-blue-600 hover:underline">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
