import express from 'express'
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from 'jsonwebtoken'
import { middleware } from './middleware.js';
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types";
import { prismaClient } from '@repo/db/client';
import bcrypt from 'bcrypt';
const app=express();
app.use(express.json());
 
app.post('/signup',async (req,res)=>{
    //zod validation
    const parsedData=CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({message:"Incorrect inputs",error:parsedData.error});
        return;
    }
    const hashedPassword=await bcrypt.hash(parsedData.data?.password, 10);
    //db call
    // create user in db
    try{
        await prismaClient.user.create({
            data:{
                email:parsedData.data?.username as string,
                password:hashedPassword as string,
                name:parsedData.data?.name
            }
        })
        res.json({message:"signed up"});

    }catch(e){
        res.status(411).json({message:"User already exists"});
    }
});
app.post('/signin',async (req,res)=>{
    const {username,password}=req.body;
    // zod validation and db call
    const data=SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({message:"Incorrect inputs"});
        return;
    }
    try{
        // find user in db
        const user=await prismaClient.user.findFirst({
            where:{
                email:username
            }
        });

        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(401).json({message:"Invalid credentials"});
            return;
        }
        const userId=user.id;
        const token=jwt.sign({
            userId
        },JWT_SECRET);
        res.json({token});
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"});
    }
});
async function getLast50Messages(roomId: number) {
    // db call  
    // const messages=await prismaClient.room.findFirst({
    //     where:{
    //         id:roomId
    //     },
    //     select:{
    //         chats:true
    //     }
    // })
    // res.json(messages?.chats);
    try{
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: 'desc'
            },
            take: 50 // Limit to the last 50 messages
        });
        return messages;

    }catch(e){
        return [];
    }
}
app.post('/create-room',middleware,async(req,res)=>{
    // zod validation 
    const roomData=CreateRoomSchema.safeParse(req.body);
    if(!roomData.success){
        res.json({message:"Incorrect inputs"});
        return;
    }
    
    //@ts-ignore
    const userId=req.userId;
    // db call
    // create room in db
    try{
        const room=await prismaClient.room.create({
            data:{
                slug:roomData.data.name,
                adminId:userId
            }
        });
        res.json({
            roomId:room.id
        })

    }catch(e){
        console.error(e);
        res.status(403).json({message:"Room already exists"});
    }
});
// TODO: Add middleware here \/
app.get("/chats/:roomId",async (req,res)=>{
    const roomId=Number(req.params.roomId) ;
    const messages=await getLast50Messages(roomId);
    if(messages.length==0){
        res.json({message:"couldnt find chats or incorrect room id",messages:[]});
        return ;
    }
    res.json(messages);
})
app.get("/room/:slug",async (req,res)=>{
    const slug=(req.params.slug) ;
    try{
        const room=await prismaClient.room.findFirst({
            where:{
                slug:slug
            }
        });
        res.json(room);

    }catch(e){
        console.error(e);
        res.status(404).json({message:"Room not found"});
    }
})


app.listen(3005);