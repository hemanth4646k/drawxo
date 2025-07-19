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
const wss = new WebSocketServer({ port: 8080 });
function isUser(token: string): string {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded.userId;
  } catch (error) {
    return "";
  }
}
wss.on("connection", function connection(ws, request) {
  let token = "";
  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data.toString()); // { type: "join_room", roomId: 123123  }
    let userid = isUser(token);
    if (token === "") {
      if (parsedData.type === "auth") {
        token = parsedData.token;
        userid = isUser(token);
        if (userid === "") {
          ws.close(1008, "Unauthorized");
          return;
        }
        users.push({ userId: userid, ws: ws, rooms: [] });
        ws.send(JSON.stringify({ type: "info", message: "Authentication successful" }));
        return;
      } else {
        ws.send(JSON.stringify({ type: "error", message: "Authentication required" }));
        return;
      }
    }

    if (parsedData.type === "join_room") {
      try {
        const user = users.find((u) => u.userId === userid);
        if (user) {
          user.rooms.push(parsedData.roomId);
        }
        ws.send(JSON.stringify({ type: "info", message: "Joined the room" }));
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: "trouble joining room no:" + parsedData.roomId }));
      }
    } else if (parsedData.type === "leave_room") {
      try {
        const user = users.find((u) => u.userId == userid);
        if (user) {
          user.rooms = user.rooms.filter((room) => room != parsedData.roomId);
        }
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: "trouble leaving room no:" + parsedData.roomId }));
      }
    } else if (parsedData.type === "chat") {
      // TODO: add zod validation
      const roomId = parsedData.roomId;
      if (!roomId) {
        ws.send(JSON.stringify({ type: "error", message: "Room ID is required" }));
        return;
      }
      const user = users.find((u) => u.userId === userid);
      if (!user?.rooms.includes(roomId)) {
        ws.send(JSON.stringify({ type: "error", message: "You are not part of this room" }));
        return;
      }
      const message = parsedData.message;
      if (!message || message.trim() === "") {
        ws.send(JSON.stringify({ type: "error", message: "Message cannot be empty" }));
        return;
      }
      try {
        const chatMessage = await prismaClient.chat.create({
          data: {
            roomId,
            userId: user?.userId as string,
            message,
          },
        });
        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(JSON.stringify({ type: "chat", roomId, message }));
          }
        });
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: "Error saving message" }));
      }
    }
    ws.on("close", () => {
      const index = users.findIndex((u) => u.ws === ws);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });
  });
});
