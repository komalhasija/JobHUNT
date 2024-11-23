import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.routes.js'
import ApplicationRoute from './routes/application.route.js'
import path from "path"
dotenv.config({});


const app=express();

const __dirname=path.resolve();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5173/'], // Allow both variants
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


app.use(cors(corsOptions));


const PORT=process.env.PORT|| 8080;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",ApplicationRoute);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(
    __dirname,"frontend","dist","index.html"
  ));
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})