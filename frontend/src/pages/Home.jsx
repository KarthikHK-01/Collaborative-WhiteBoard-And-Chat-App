import { useEffect, useState } from "react"
import DrawingCanvas from "../utils/Canvas"
import { signOut } from "firebase/auth";
import {auth} from "../config/firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import Chat from "../utils/Chat.jsx";
import socket from "../config/socket.js";
import People from "../utils/People.jsx";
import { useUser } from "../context/user.jsx";


export default function Home() {
  const navigate = useNavigate();
  const [color, setColor] = useState("#000000");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const location = useLocation();
  
  const {name} = useUser();
  
  const roomId = location.state?.roomId;

  useEffect(() => {
    if(roomId && name) {
      socket.emit("join-room", {roomId, name});
    } else if(!roomId) {
      console.log("No Room ID found....Please Enter correct Room ID");
      navigate("/room");
    }
  }, [roomId, name]);

  const handleColorClick = (colorVal) => {
    setColor(colorVal);
    setSelectedColor(colorVal);
  } 

  const handleLogout = async () => {
    try {
      console.log("Signing out... Please wait.");
      await signOut(auth);
      console.log("Signed Out");
      localStorage.removeItem("token");
      navigate("/");
    } catch(err) {
      console.log("Couldn't sign out :)", err);
    }
  }

  const handleGoBack = () => {
    socket.emit("leave-room", {roomId});
    navigate("/room");
  }

  const colors = [
    { value: "#ef4444", bg: "bg-red-500" },
    { value: "#3b82f6", bg: "bg-blue-500" },
    { value: "#22c55e", bg: "bg-green-500" },
    { value: "#eab308", bg: "bg-yellow-500" },
    { value: "#a855f7", bg: "bg-purple-500" },
    { value: "#ec4899", bg: "bg-pink-500" },
    { value: "#f97316", bg: "bg-orange-500" },
    { value: "#14b8a6", bg: "bg-teal-500" },
    { value: "#6366f1", bg: "bg-indigo-500" },
    { value: "#1f2937", bg: "bg-gray-800" },
    { value: "#000000", bg: "bg-black" },
    { value: "#9F22F3", bg: "bg-[#9F22F3]" },
    { value: "#0ea5e9", bg: "bg-sky-500" },      // Sky Blue  
    { value: "#84cc16", bg: "bg-lime-500" },     // Lime Green  
    { value: "#f43f5e", bg: "bg-rose-500" },     // Rose  
    { value: "#10b981", bg: "bg-emerald-500" },  // Emerald  
    { value: "#8b5cf6", bg: "bg-violet-500" },   // Violet  
    { value: "#fb923c", bg: "bg-amber-400" },    // Amber  
    { value: "#facc15", bg: "bg-yellow-400" },   // Bright Yellow  
    { value: "#64748b", bg: "bg-slate-500" }
  ]

  return (
    <div className="w-full h-screen bg-blue-700 flex justify-start items-start p-[50px] overflow-hidden">
      {/* <div className="flex-col">Hello</div> */}
      <div className="w-[850px] h-full">
        <DrawingCanvas color={color} roomId={roomId}/>
      </div>

      <div className="flex-1 flex flex-col ml-4 h-full gap-4 overflow-hidden">
        <div className="bg-white rounded-lg shadow-lg p-4 flex-shrink-0">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Choose Your Color</h3>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {colors.map((colorObj) => (
                <button
                  key={colorObj.value}
                  className={`w-10 h-10 rounded-full ${colorObj.bg} border-2 transition-all ${
                    selectedColor === colorObj.value
                      ? "border-black border-4"
                      : "border-transparent hover:border-gray-800"
                  }`}
                  onClick={() => handleColorClick(colorObj.value)}
                ></button>
              ))}
            </div>
            <div className="pl-[50px] pr-[20px]">
              <button className="bg-red-500 p-3 rounded-lg text-white" onClick={handleLogout}>Logout</button>
              <button className="bg-red-500 p-3 rounded-lg text-white mt-2" onClick={handleGoBack}>Go Back</button>
            </div>
          </div>
        </div>  

        <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
          <Chat roomId={roomId}/>

          <People />
        </div>
      </div>
    </div>
  )
}
