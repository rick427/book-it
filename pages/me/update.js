import Layout from '@/components/layout/Layout';
import Profile from '@/components/user/Profile';
import {getSession} from 'next-auth/client';

export default function UpdateProfilePage({session}) {
    return (
        <Layout title="Update profile">
            <Profile/>
        </Layout>
    )
}

export async function getServerSideProps(ctx){
    const {req} = ctx;

    const session = await getSession({req});
    if(!session){
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}
