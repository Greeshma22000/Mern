import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/notes", noteRoutes);

connectDB();

app.listen(port, () =>{
    console.log(`Server is running in ${port}✅✅....!`);
});