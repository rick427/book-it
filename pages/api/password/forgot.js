  
import nc from 'next-connect'
import dbConnect from '@/config/db-connect'

import { forgotPassword } from '@/controllers/auth-controllers'

import onError from '@/middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.post(forgotPassword)

export default handler;