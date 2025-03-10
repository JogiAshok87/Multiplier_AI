import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { storeContext } from '../ContextAPI'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate()
  const { login } = useContext(storeContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ username, password, remember });
    try{
      const response = await axios.post('http://127.0.0.1:5000/login',{
        username:username,
        password: password,
      });
      if(response.status === 200){
        // alert("Login Successfull!");

        toast.success("User Loggined Successfully!", {
          position: "top-right",
          style:{
            color:"black"
          }
        });

        console.log("Token:",response.data.token);
        localStorage.setItem("authToken",response.data.token);
        login(response.data.token)
        setTimeout(()=>{
          navigate("/campaignPage")
        },3000)
      }else{
        navigate("/login")
      }
    }catch(error){
      console.error("Login error:",error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed! Please try again",{
        position: "top-right",
        style:{
          color:"black"
        }
      })
    }
  };

  return (
    <div className="flex  justify-center min-h-screen  bg-gray-100">
      <ToastContainer />
      <div className="w-1/2 flex flex-col mt-8">
         < img src="/multiplier_logo.png" alt="" className="w-64"/>
         
         <p className="mt-60"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div className="w-full max-w-md bg-white px-10 py-14  rounded-lg shadow-lg m-10 min-h-min">
        <h2 className="text-2xl font-bold text-center mb-2 text-[#800080]">Log in</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to access features and services
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter your username</label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Enter your passcode</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              Remember
            </label>
            <a href="#" className="text-black text-sm">Forgot your passcode?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#800080] text-white py-2 rounded-lg font-semibold"
          >
            Sign in
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <p className="text-center text-gray-700">
          Create a new account.{" "}
          <a href="#" className="text-[#800080] font-semibold">Sign up</a>
        </p>
      </div>
    </div>
  );
}
