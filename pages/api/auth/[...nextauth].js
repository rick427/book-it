import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import User from '@/models/user';
import dbConnect from '@/config/db-connect';

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials){
                dbConnect();

                const {email, password} = credentials;

                //check if email and password are entered
                if(!email || !password){
                    throw new Error('Please enter email or password');
                }

                //Find user in the database
                const user = await User.findOne({email}).select('+password');

                if(!user) throw new Error('Invalid email or password');

                const isPasswordMatched = await user.comparePassword(password);

                if(!isPasswordMatched){
                    throw new Error('Invalid email or password');
                }

                return Promise.resolve(user);
            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            user && (token.user = user);

            return Promise.resolve(token);
        },
        session: async (session, token) => {
            session.user = token.user;

            return Promise.resolve(session)
        }
    }
})