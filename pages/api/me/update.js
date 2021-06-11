import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {updateUser} from '@/controllers/auth-controllers';

import {isAuthenticated} from '@/middlewares/auth';
import onError from '@/middlewares/errors';

const handler = nc({onError});

dbConnect();

handler.use(isAuthenticated).put(updateUser);

export default handler;