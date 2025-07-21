"use client";
import { Button } from '@repo/ui/button';
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
        <Button onClick={()=>{
          router.push(`/room/${roomIdRef.current?.value}`);
        }} variant='default' >Submit</Button>
      </div>
    </div>
  );
}
