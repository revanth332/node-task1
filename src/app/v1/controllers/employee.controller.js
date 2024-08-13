import logger from "../../../../logger.js";
import config from "../../../../config.js";
import pkg from 'jsonwebtoken';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Employee from "../models/employee.model.js";

const { sign } = pkg;

export async function addEmployee(req,res){
    try{
        const empData = req.body;
        const result = await Employee.create(empData)
        if(result.status == 200){
            return res.status(200).send(result.msg)
        }
        else{
            return res.status(400).send(result.msg)
        }
    }
    catch(err){
        console.log(err)
    }
}

export async function updateEmployee(req,res){
    try{
        const empData = req.body;
        const result = await Employee.update(empData);
        console.log(result)
        if(result.status == 200){
            return res.status(200).send(result.msg)
        }
        else{
            return res.status(400).send(result.msg)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({"msg":"Internal server error"})
    }
}

export async function assignEmployee(req,res){
    try{
        const empData = req.body;
        const result = await Employee.assign(empData);
        console.log(result)
        if(result.status == 200){
            return res.status(200).send(result.msg)
        }
        else{
            return res.status(400).send(result.msg)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({"msg":"Internal server error2"})
    }
}

export async function deleteEmployee(req,res){
    try{
        const empData = req.body;
        const result = await Employee.delete(empData);
        console.log(result)
        if(result.status == 200){
            return res.status(200).send(result.msg)
        }
        else{
            return res.status(400).send(result.msg)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({"msg":"Internal server error2"})
    }
}

export async function fetchEmployee(req,res){
    try{
        const empData = req.body;
        const result = await Employee.fetch(empData);
        console.log(result)
        if(result.status == 200){
            return res.status(200).send(result.data)
        }
        else{
            return res.status(400).send(result.msg)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({"msg":"Internal server error2"})
    }
}

export function temp(req,res){
    res.status(200).send("hello emp");
}