import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./db/dbconnection.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from  "./routes/application.route.js"
dotenv.config({})
const app  = express()
const PORT = process.env.PORT || 8006

//middleware
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
    origin :'http://localhost:5173',
    credentials : true
}
//app.use(cors());
app.use(cors(corsOptions));
//app.use(cors({ origin: '*' }));

//api's 
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute)


dbConnection()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection error", err);
    
})