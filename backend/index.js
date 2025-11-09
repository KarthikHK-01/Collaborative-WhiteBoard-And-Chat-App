import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";
import { socketHandler } from "./config/sockets/socketHandler.js";
import dotenv from "dotenv";

const app = express();
const server = createServer(app);
const io = initSocket(server);

dotenv.config();

socketHandler(io);

const allowedOrigins = [
  "https://collaborative-white-board-amber.vercel.app",
  "http://localhost:5173", 
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

connectDB().then(() => {
    const PORT = process.env.PORT || 9456;
    server.listen(PORT, () => {
        console.log("Server and socket connected running on 9456");
    })
}).catch(() => {
    console.log("Couldnt connect to database");
})