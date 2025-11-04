import { useState } from "react"
import DrawingCanvas from "../utils/Canvas"
import { signOut } from "firebase/auth";
import {auth} from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [color, setColor] = useState("#000000");
  const [selectedColor, setSelectedColor] = useState("#000000");

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
        <DrawingCanvas color={color} />
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
          <div className="flex flex-col bg-white rounded-lg shadow-lg flex-1 overflow-hidden">
            <div className="bg-blue-600 text-white p-4 font-semibold flex-shrink-0 rounded-t-lg">Chat</div>

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="p-3 mb-2 bg-gray-100 rounded-md text-sm shadow-sm">
                    <span className="font-bold">Player{(i % 3) + 1}:</span> Hello there!
                  </div>
                ))}
            </div>

            <div className="p-3 border-t flex-shrink-0 bg-white">
              <input type="text" placeholder="Type message..." className="w-full border rounded-md p-2 outline-none" />
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-lg w-[250px] overflow-hidden">
            <div className="bg-green-600 text-white p-4 font-semibold flex-shrink-0 rounded-t-lg">Players (3)</div>

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 p-2 bg-gray-50 rounded mb-1">
                    {/* <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-green-500" : "bg-yellow-500"}`}></div> */}
                    <span className="text-sm font-medium">Player{i + 1}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
