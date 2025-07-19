import axios from "axios";
import { HTTP_BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string ){
    const response=await axios.get(HTTP_BACKEND_URL+"/chats/"+roomId);
    return response.data;
}
export async function ChatRoom({id}:{id:string}){
    const messages=await getChats(id);
    return <ChatRoomClient messages={messages} id={id}></ChatRoomClient>
}