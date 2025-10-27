import type { Request, Response,NextFunction } from "express";
import { conn } from "../config/db";


export async function addJob(req:Request,res:Response,next:NextFunction){
    try{
        const {title,company,status,description} = req.body 

        if(!title||!company||!status||!description){
            res.status(400).json({message:"Please provide all neccessary information"})
        }
        const query = `INSERT INTO jobs(title,company,status,description) VALUES($1,$2,$3,$4) RETURNING *`
        const result = await conn.query(query,[title,company,status,description])
        const created = result.rows[0]
        
    res.status(201).json({
        id:created.id,
        title:created.title,
        company:created.company,
        status:created.status,
        description:created.description,
        date_created:created.date_created
    })


    }catch(err){
        next(err)
        res.status(500).json({error:"Internal server error",err})
    }

}
export async function getAllJobs(req:Request,res:Response,next:NextFunction){
    try{
        const query = `SELECT * from jobs`
        const result  = await conn.query(query)
        const created  = result.rows

        if(created.length === 0 ){
            return res.status(200).json({message:"No jobs found",data:created})
        }

    res.status(200).json({data:created})


    }catch(err){
        next(err)
        return res.status(500).json({error:"Internal server error"})
    }

}
export async function getSingleJob(req:Request,res:Response,next:NextFunction){
    try{
        const {id} = req.params
        const query  = `SELECT * FROM jobs WHERE id=$1`
        const result  = await conn.query(query,[id])
        const created =  result.rows

        if(created.length === 0){
           return res.status(404).json({error:'Not Found',message:"Job not found "})
        }
    
    res.status(200).json({data:created})


    }catch(err){
        next(err)
        res.status(500).json({error:"Internal Server error"})
    }

}
export async function updateJob(req:Request,res:Response,next:NextFunction){
    try{
        const {id} = req.params
        const {title,company,status,description} = req.body
        if(title){
            const query = `UPDATE jobs SET title= $1 WHERE id = ${id}`
            const result = await conn.query(query,[title])
            const updated = result.rows 
            
            if(updated.length === 0 ){
                return res.status(401).json({message:"No Job found"})
            }
        return res.status(200).json({message:"Job Updated",data:updated})

        }
    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}

export async function deleteJob(req:Request,res:Response,next:NextFunction){
    try{
        const {id} = req.params
        const query = `DELETE FROM jobs WHERE id=$1`
        const result  = await conn.query(query,[id])
        const affected = result.rows
        if(affected.length ==0){
            return res.status(404).json({message:"No job deleted, try valid job"})
        }

    res.status(200).json({message:"deleted job"})


    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}