"use client";

import { useEffect, useRef } from "react";

export default function (){
    const canvasRef= useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
            const ctx=canvas.getContext("2d");
            let mousedown=false;
            let ptrx=0;
            let ptry=0;
            if(!ctx)return;
            canvas.addEventListener("mousedown",(e)=>{
                mousedown=true;
                ptrx=(e.clientX);
                ptry=(e.clientY);
            });
            canvas.addEventListener("mouseup",(e)=>{
                mousedown=false;
                console.log(ptrx)
                console.log(ptry);
                console.log(e.clientX);
                console.log(e.clientY);
            });
            canvas.addEventListener("mousemove",(e)=>{
                if(mousedown) {
                const width=e.clientX-ptrx;
                const height=e.clientY-ptry;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.strokeRect(ptrx,ptry,width,height);
                }
            });
        }
    },[])
    return (
        <div>
            <canvas ref={canvasRef} width={500} height={500}></canvas>

        </div>
    )
}