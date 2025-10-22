import type { Request, Response,NextFunction } from "express";


export function addJob(req:Request,res:Response,next:NextFunction){
    try{
    res.status(200).json({message:"New Job created "})


    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}
export function getAllJobs(req:Request,res:Response,next:NextFunction){
    try{
    res.status(200).json({message:"Get all Jobs"})


    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}
export function getSingleJob(req:Request,res:Response,next:NextFunction){
    try{
    res.status(200).json({message:"Get single Job"})


    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}
export function updateJob(req:Request,res:Response,next:NextFunction){
    try{
    res.status(200).json({message:"Update job"})


    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}
export function deleteJob(req:Request,res:Response,next:NextFunction){
    try{
    res.status(200).json({message:"deleted job"})


    }catch(err){
        next(err)
        res.status(404).json({error:"Erro can't add new Job"})
    }

}