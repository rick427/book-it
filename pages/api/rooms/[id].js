import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {getSingleRoom} from '@/controllers/room-controllers'; 

const handler = nc();

dbConnect();

handler.get(getSingleRoom);

export default handler;