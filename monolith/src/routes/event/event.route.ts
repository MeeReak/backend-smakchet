import express, { NextFunction, Request, Response } from "express";

const eventRoute = express.Router();

eventRoute.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.json({message: "hi"})
})

eventRoute.post("/",(req:Request,res:Response,next:NextFunction)=>{
    
})

export default eventRoute;