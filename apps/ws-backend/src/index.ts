import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
interface User {
    userId: string;
    ws: WebSocket;
    rooms: string[];
}
const users: User[] = [];
const wss=new WebSocketServer({port:8080});
function isUser(token: string): string {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded.userId;
    } catch (error) {
        return "";
    }
}
wss.on("connection",function connection(ws,request){
    const token=request.headers.authorization??"";
    const userid = isUser(token);
    if(userid==="") {
        ws.close(1008,"Unauthorized");
        return;
    }
    users.push({ userId: userid, ws: ws, rooms: [] });
    ws.on("message",async function message(data){
        const parsedData = JSON.parse(data.toString());// { type: "join_room", roomId: 123123  }
        if(parsedData.type==="join_room"){
            const user=users.find(u=>u.userId===userid);
            if(user) {
                user.rooms.push(parsedData.roomId);
            }
        }else if(parsedData.type==="leave_room"){
            const user=users.find(u=>u.userId==userid);
            if(user) {
                user.rooms = user.rooms.filter(room=>room!=parsedData.roomId);
            }
        }else if(parsedData.type==="chat"){
            const roomId = parsedData.roomId;
            const user = users.find(u => u.userId === userid);
            const message = parsedData.message;
            const chatMessage = await prismaClient.chat.create({
                data: {
                    roomId,
                    userId: user?.userId as string,
                    message
                }
            });
            users.forEach(user => {
                if (user.rooms.includes(roomId)) { 
                    user.ws.send(JSON.stringify({ type: "chat", roomId, message }));
                }
            });
        }
        // ws.send(data+"\n****\n"+userid);
    })
})