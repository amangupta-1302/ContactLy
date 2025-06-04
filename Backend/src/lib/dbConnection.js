import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("connected to Mongo_DB :", conn.connection.host)
    }
    catch (error) {
        console.log("Error while connecting to database : ", error)
    }
} 
