import dotenv from "dotenv"
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"

dotenv.config()

export interface AuthRequest extends Request{
    user?:any
}

export const AuthMiddleWare = (req:AuthRequest,res:Response,next:NextFunction) =>{
    const authHeader = req.headers["authorization"]

    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"})
    }

     const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
   try {
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET  as string) as JwtPayload
    console.log(decoded)

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" })
  }
    req.user = decoded
    next()

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}