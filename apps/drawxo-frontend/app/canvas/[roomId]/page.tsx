"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export default function (){
    const canvasRef= useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
            const ctx=canvas.getContext("2d");
            if(!ctx)return;
            initDraw(ctx,canvas);
        }
    },[])
    return (
        <div>
            <canvas ref={canvasRef} width={500} height={500}></canvas>

        </div>
    )
}