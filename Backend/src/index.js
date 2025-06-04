import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/dbConnection.js"
import cookieParser from "cookie-parser"
import contactRoutes from "./routes/contactRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/users", userRoutes)
app.use("/api/contacts", contactRoutes)


app.listen(process.env.PORT, () => {
    console.log("Server listening on PORT", process.env.PORT)
    connectDB()
})