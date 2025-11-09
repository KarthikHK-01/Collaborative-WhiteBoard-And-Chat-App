import { io } from "socket.io-client";

const socket = io("https://collaborative-whiteboard-hkxr.onrender.com/", {
  transports: ["websocket"],
});

export default socket;