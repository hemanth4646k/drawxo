"use client"

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,id
}:{
    messages:any[],
    id:string
}){
    const [chats,setChats]=useState(messages.slice().reverse());
    const {socket,loading}=useSocket();
    const inputRef=useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(socket&&!loading){
            console.log(socket);
            console.log(loading);
            socket.send(JSON.stringify({
                type:"join_room",
                roomId:Number(id)
            }))
            socket.onmessage=(e)=>{
                const parsedData=JSON.parse(e.data);
                if(parsedData.type==='chat'&&parsedData.roomId===Number(id)){
                    setChats(c=>[...c,parsedData]);
                }
            }
        }
        return ()=>{
            if(socket){
                socket.send(JSON.stringify({
                    type:"leave_room",
                    roomId:Number(id)
                }))
            }
        }
    },[socket,loading,id]);
    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div>
            {
                chats.map((c,index)=>(
                    <div key={index}>
                        <div>{c.message}</div>
                        <br></br>
                    </div>
                ))
            }
            <input ref={inputRef} type="text" placeholder="Type a message"/>
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type:"chat",
                    message:inputRef.current?.value,
                    roomId:id
                }))
                if(inputRef.current)inputRef.current.value="";
            }}>Send Message</button>
        </div>
    )
}