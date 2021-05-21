import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {allRooms} from '@/controllers/room-controllers';

const handler = nc();

dbConnect();

handler.get(allRooms);

export default handler;