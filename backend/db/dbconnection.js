import mongoose from "mongoose";
import dotenv from "dotenv"
const dbConnection  = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Mongo DB is connected successfully!");
    } catch (error) {
        console.log("hello",process.env.MONGODB_URI);
        
        console.log("DB connection error",error);
    }
}

export default dbConnection;