import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/dbConnection.js"
import cookieParser from "cookie-parser"
import contactRoutes from "./routes/contactRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import path from "path"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

const __dirname = path.resolve()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/users", userRoutes)
app.use("/api/contacts", contactRoutes)

app.use(express.static(path.join(__dirname, "../Frontend/dist")))

app.get(/(.*)/, (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log("Server listening on PORT", process.env.PORT)
    connectDB()
})