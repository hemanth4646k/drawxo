import express from 'express'
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from 'jsonwebtoken'
import { middleware } from './middleware';
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types";
const app=express();
app.use(express.json());
 
app.post('/signup',(req,res)=>{
    //zod validation
    const data=CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({message:"Incorrect inputs"})
    }
    //db calls
    res.json({message:"signed up"});
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