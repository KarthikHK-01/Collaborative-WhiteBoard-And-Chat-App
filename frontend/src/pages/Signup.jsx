import { useNavigate } from "react-router-dom";
import {auth, provider} from "../config/firebase.js";
import {onAuthStateChanged, signInWithPopup} from "firebase/auth"
import { useEffect, useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  const handleSignup = async () => {
    try{
      const result = await axios.post("http://localhost:9456/signup", {
        name, username, email, password, confirmPassword
      });

      console.log(result);
      localStorage.setItem("token", result.data.token);
      setErrMessage("");
      navigate("/home");
    } catch(err) {
      if(err.response && err.response.data && err.response.data.message) {
        setErrMessage(err.response.data.message);
      } else {
        setErrMessage("Something went wrong. Try again later.");
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <section
        className="flex-grow relative bg-center bg-no-repeat bg-cover flex items-center justify-center text-center px-4 w-full h-screen"
        style={{
          backgroundImage:
            "url('/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>

          {errMessage && (
            <div className="text-red-500 font-sm mb-4">{errMessage}</div>
          )} 

          <label className="block text-left mb-4">
            <p className="text-lg font-medium mb-1">Name</p>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block text-left mb-4">
            <p className="text-lg font-medium mb-1">Username</p>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>

          <label className="block text-left mb-4">
            <p className="text-lg font-medium mb-1">Email</p>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block text-left mb-4">
            <p className="text-lg font-medium mb-1">Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block text-left mb-6">
            <p className="text-lg font-medium mb-1">Confirm Password</p>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="flex items-center justify-center w-full gap-3 border border-gray-300 rounded-full px-5 py-2.5 bg-white shadow-sm hover:shadow-md transition mb-4"
            onClick={handleGoogleSignIn}
          >
            <img
              src="../g_logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
}

export default Signup;
