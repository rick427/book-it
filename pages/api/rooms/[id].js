import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {getSingleRoom, updateRoom} from '@/controllers/room-controllers'; 

const handler = nc();

dbConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);

export default handler;