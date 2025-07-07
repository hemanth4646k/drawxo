import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss=new WebSocketServer({port:8080});
wss.on("connection",function connection(ws,request){
    const token=request.headers.authorization??"";
    const user=jwt.verify(token,JWT_SECRET) as JwtPayload;
    ws.on("message",function message(data){
        ws.send(data+"\n****\n"+user.userId);
    })
})