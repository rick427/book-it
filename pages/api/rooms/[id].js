import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {deleteRoom, getSingleRoom, updateRoom} from '@/controllers/room-controllers'; 

const handler = nc();

dbConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;