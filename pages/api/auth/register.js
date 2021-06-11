import nc from 'next-connect';
import dbConnect from '@/config/db-connect';
import {registerUser} from '@/controllers/auth-controllers';

import onError from '@/middlewares/errors';

const handler = nc({onError});

dbConnect();

handler.post(registerUser);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default handler;