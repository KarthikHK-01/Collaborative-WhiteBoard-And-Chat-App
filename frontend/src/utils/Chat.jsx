import {useState, useEffect} from "react";
import socket from "../config/socket.js";
import { useUser } from "../context/user.jsx";

function Chat(props) {
    // const {roomId} = useRoom();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const {name} = useUser();
    const roomId = props.roomId;

    // console.log("Chat room:", roomId);

    useEffect(() => {
      socket.on("receive-message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off("receive-message");
      }
    }, []);

    const sendMessage = () => {
      if(!message.trim()) {
        return;
      }

      const msg = {
        sender: name,
        message,
        timestamp: Date.now(),
      };

      // setMessages((prev) => [...prev, msg]);

      socket.emit("send-message", {roomId, ...msg});

      setMessage("");
    }
    
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg flex-1 overflow-hidden">
            <div className="bg-blue-600 text-white p-4 font-semibold flex-shrink-0 rounded-t-lg">Chat</div>

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 mb-2 rounded-md text-sm shadow-sm ${
                    msg.sender === name
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  <span className="font-bold">
                    {msg.sender === name ? "You" : msg.sender}:
                  </span>{" "}
                  {msg.message}
                </div>
              ))}
            </div>


            <div className="p-3 border-t flex-shrink-0 bg-white">
              <input type="text" placeholder="Type message..." value={message} onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter") sendMessage();
              }} className="w-full border rounded-md p-2 outline-none" />
            </div>
          </div>
    )
}

export default Chat;