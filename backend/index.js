import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use("/", router);

connectDB().then(() => {
    app.listen(9456, () => {
        console.log("Server running on 9456");
    })
}).catch(() => {
    console.log("Couldnt connect to database");
})