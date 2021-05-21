import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {allRooms, newRoom} from '@/controllers/room-controllers';

import onError from '@/middlewares/errors';

const handler = nc({onError});

dbConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;