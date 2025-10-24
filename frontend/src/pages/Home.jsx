import Canvas from "../utils/Canvas";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-blue-700 flex justify-start items-center p-4 overflow-hidden">
      <div className="w-[850px] h-[700px]">
        <Canvas />
      </div>

      <div className="flex-1 flex flex-col ml-4 h-[700px]">
        {/* Color Palette */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Choose Your Color</h3>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button className="w-10 h-10 rounded-full bg-red-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-blue-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-green-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-purple-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-pink-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-orange-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-teal-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-transparent hover:border-gray-800 transition-all"></button>
              <button className="w-10 h-10 rounded-full bg-gray-800 border-2 border-transparent hover:border-gray-800 transition-all"></button>
            </div>
            
          
          </div>
        </div>

        <div className="flex gap-4 flex-1">
          {/* Chatbox */}
          <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg font-semibold">
              Chat
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-semibold text-sm">Player1:</span>
                <span className="text-sm ml-2">Hello everyone!</span>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-semibold text-sm">Player2:</span>
                <span className="text-sm ml-2">Ready to play?</span>
              </div>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Players List */}
          <div className="w-[350px] bg-white rounded-lg shadow-lg flex flex-col">
            <div className="bg-green-600 text-white p-4 rounded-t-lg font-semibold">
              Players (3)
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Player1</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Player2</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Player3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}