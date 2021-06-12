  
import nc from 'next-connect'
import dbConnect from '@/config/db-connect'

import { resetPassword } from '@/controllers/auth-controllers'

import onError from '@/middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword)

export default handler;