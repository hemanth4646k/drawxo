import express from 'express'
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from 'jsonwebtoken'
import { middleware } from './middleware.js';
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types";
import { prismaClient } from '@repo/db/client';
const app=express();
app.use(express.json());
 
app.post('/signup',async (req,res)=>{
    //zod validation
    const parsedData=CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({message:"Incorrect inputs"})
    }
    try{
        await prismaClient.user.create({
            data:{
                email:parsedData.data?.username as string,
                password:parsedData.data?.password as string,
                name:parsedData.data?.name
            }
        })
        res.json({message:"signed up"});

    }catch(e){
        res.status(411).json({message:"User already exists"});
    }
});
app.post('/signin',(req,res)=>{
    const {username,password}=req.body;
    // zod validation and db call
    const data=SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({message:"Incorrect inputs"});
    }
    const userId=1;
    const token=jwt.sign({
        userId
    },JWT_SECRET);
    res.json({token});
});
app.post('/create-room',middleware,(req,res)=>{
    // db call
    const data=CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({message:"Incorrect inputs"});
    }
    res.json({
        roomId:123123 // should be random
    })
});


app.listen(3005);