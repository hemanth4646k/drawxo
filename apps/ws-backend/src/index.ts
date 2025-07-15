import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

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
    ws.on("message",function message(data){
        const parsedData = JSON.parse(data.toString());// { type: "join_room", roomName: "room1"  }
        if(parsedData.type==="join_room"){
            const user=users.find(u=>u.userId===userid);
            if(user) {
                user.rooms.push(parsedData.roomName);
            }
        }else if(parsedData.type==="leave_room"){
            const user=users.find(u=>u.userId==userid);
            if(user) {
                user.rooms = user.rooms.filter(room=>room!=parsedData.roomName);
            }
        }else if(parsedData.type==="chat"){
            const roomName = parsedData.roomName;
            const user = users.find(u => u.userId === userid);
            const message = parsedData.message;
            users.forEach(user => {
                if (user.rooms.includes(roomName)) { 
                    user.ws.send(JSON.stringify({ type: "chat", roomName, message }));
                }
            });
        }
        // ws.send(data+"\n****\n"+userid);
    })
})