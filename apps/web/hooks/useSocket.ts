import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]=useState<Boolean>(true);
    const [socket,setSocket]=useState<WebSocket>();
    useEffect(()=>{
        const ws=new WebSocket(WS_BACKEND_URL);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "auth",
                token: localStorage.getItem("Authentication") || ""
            }));
        }
    },[]);
    return {
        socket,
        loading
    }
}