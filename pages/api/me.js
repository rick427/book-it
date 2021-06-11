import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {currentUser} from '@/controllers/auth-controllers';
import {isAuthenticated} from '@/middlewares/auth';

import onError from '@/middlewares/errors';

const handler = nc({onError});

dbConnect();

handler.use(isAuthenticated).get(currentUser);

export default handler;