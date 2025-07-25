import axios from "axios";
import { HTTP_BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";
async function getRoomData(slug:string) {
    const res = await axios.get(HTTP_BACKEND_URL+`/room/${slug}`);
    console.log(res.data);
    const roomId= res.data.id;
    return roomId;
}
export default async function RoomPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const roomId = await getRoomData(slug);
    return <ChatRoom id={roomId}></ChatRoom>
}