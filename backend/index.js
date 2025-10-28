import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";
import { socketHandler } from "./config/sockets/socketHandler.js";

const app = express();
const server = createServer(app);
const io = initSocket(server);

socketHandler(io);

app.use(cors());
app.use("/", router);

connectDB().then(() => {
    server.listen(9456, () => {
        console.log("Server and socket connected running on 9456");
    })
}).catch(() => {
    console.log("Couldnt connect to database");
})