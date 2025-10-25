import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DB_STRING;

async function connectDB() {
    await mongoose.connect(URI)
    .then(() => console.log("DB connected :)"))
    .catch((err) => console.log("Error in DB connection :("));
}

export default connectDB;