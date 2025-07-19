"use client";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Home() {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const router=useRouter();
  return (
    <div >
      <div>
        <input ref={roomIdRef} type="text" placeholder="Enter Room Id"/>

      </div>
      <div>
        <button onClick={()=>{
          router.push(`/room/${roomIdRef.current?.value}`);
        }}>Submit</button>
      </div>
    </div>
  );
}
