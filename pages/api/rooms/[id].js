import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {deleteRoom, getSingleRoom, updateRoom} from '@/controllers/room-controllers'; 

import onError from '@/middlewares/errors';

const handler = nc({onError});

dbConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;