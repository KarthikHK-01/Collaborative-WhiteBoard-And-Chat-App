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

app.use(
  cors({
    origin: [
      "collaborative-white-board-amber.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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