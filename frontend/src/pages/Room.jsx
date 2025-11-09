import { useEffect, useState } from "react"
import socket from "../config/socket.js"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase.js"

function Room() {
  const navigate = useNavigate();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generatedRoomId, setGeneratedRoomId] = useState("");

  const [roomId, setRoomId] = useState("");
  
  useEffect(() => {
    socket.on("created-room", ({ roomId }) => {
      setRoomId(roomId);
      setIsCreateDialogOpen(false);
      navigate("/home", {state: {roomId}});
    })

    socket.on("joined-room", ({ roomId }) => {
      console.log(`Joined Room: ${roomId}`)
      setRoomId(roomId)
      navigate("/home", {state: {roomId}});
    })

    socket.on("error-message", ({ message }) => {
      alert(message);
      navigate("/room");
    })

    return () => {
      socket.off("error-message")
      socket.off("created-room")
      socket.off("joined-room")
    }
  }, [])

  const makeID = () => {
    var result = ""
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var len = chars.length

    for (var i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * len))
    }

    return result
  }

  // const generatedRoomId = makeID()


  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRoomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = async () => {
    try{
      console.log("signing out..");
      await signOut(auth);
      console.log("signed out");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-600 min-h-screen flex flex-col p-4">
      <div className="flex justify-between items-center mb-12 pt-4">
        <h1 className="text-white text-2xl font-bold tracking-tight">Team Write</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl p-8 mb-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Join a Room</h2>
            <p className="text-gray-600 text-sm mb-6">Enter an existing room ID to connect</p>

            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow-md hover:shadow-lg"
              onClick={() => {
                socket.emit("join-room", { roomId })
              }}
            >
              Enter Room
            </button>
          </div>

          <button
            onClick={() => {
              setGeneratedRoomId(makeID());
              setIsCreateDialogOpen(true);
            }}
            className="w-full bg-white text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold border-2 border-white hover:border-blue-100 shadow-md hover:shadow-lg"
          >
            + Create a New Room
          </button>

          {isCreateDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Create a Room</h2>
                <p className="text-gray-600 text-sm mb-6">Generate a new room ID to share</p>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Your Room ID</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={generatedRoomId}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none font-mono text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-md hover:shadow-lg"
                    onClick={() => {
                      socket.emit("create-room", { roomId: generatedRoomId })
                    }}
                  >
                    Create & Join
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { Room }
