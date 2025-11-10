import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDB from "../db/connectionDB.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import cloudinary from "cloudinary";
import postRoute from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js";
import cors from "cors";
// import path from "path";


dotenv.config();
// const __dirname = path.resolve();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});
const app = express();
const PORT = process.env.PORT;

app.use(express.json({
    limit: "5mb"
}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/notifications", notificationRoute);

// if (process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/build")));
//     app.use("*", (req,res) => {
//         res.sendFile(path.resolve(__dirname, "frontend","build","index.html"));
//     });
// }

    // "build": "npm install && npm install --include=dev --prefix frontend && npm run build --prefix frontend",

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})