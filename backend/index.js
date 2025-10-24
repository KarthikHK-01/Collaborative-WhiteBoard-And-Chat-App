import express from "express";
import router from "./routes/router.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/", router);

app.listen(9456, () => {
    console.log("Server running on 9456");
});