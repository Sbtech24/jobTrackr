import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { conn } from "../config/db";
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export async function RegisterUser(req:Request,res:Response,next:NextFunction){
    try{
        const {username,password} = req.body
    
        const query = `select username from users WHERE username = $1`
        const existing  = await conn.query(query,[username])
        if(existing){
            return res.status(400).json({message:"Username already exists"})
        }

       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password, saltRounds);

       const insert = await conn.query(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`,[username,hashedPassword])
       const result  = insert.rows[0]

       return res.status(201).json({message:`User ${result.username} created successfully`})

    }catch(err){
        next(err)
        return res.status(500).json({message:"Internal server error"})

    }

}

export async function Login(req:Request,res:Response,next:NextFunction){
    try{
         const {username,password} = req.body

    const query = `SELECT * from users WHERE username = $1`
    const result = await conn.query(query,[username])
    const user = result.rows[0]
    const hash = result.rows[0].password
    const comparePassword = await bcrypt.compare(password,hash)

    if(!comparePassword){
        return res.status(401).json({message:"Incorrect username or password"})

    }

    if(!JWT_SECRET){
            return res.status(500).json({message:"Internal server error"})
    }
    


    const token = jwt.sign({username:user.username,password:user.password},JWT_SECRET,{expiresIn:"1h"})

    res.status(200).json({token})

    }catch(err){
        next(err)
        return res.status(500).json({message:"Internal server error"})

    }
   

}