import { useState } from "react"

export function Room() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [roomId, setRoomId] = useState("")
  const [copied, setCopied] = useState(false)

    const makeID = () => {
        var result = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var len = chars.length;

        for(var i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * len));
        }

        return result;
    }

    const generatedRoomId = makeID();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRoomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-blue-700 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Room ID</h2>
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition">
            Enter Room
          </button>
        </div>

        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="w-full bg-white text-blue-700 py-3 px-4 rounded-md hover:bg-gray-100 transition font-semibold"
        >
          Create a Room
        </button>

        {isCreateDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Create a Room</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Room ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={generatedRoomId}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none font-mono"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition">
                  Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
