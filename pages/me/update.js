import {getSession} from 'next-auth/client';

export default function UpdateProfilePage({session}) {
    return (
        <div>
            UPDATE MY PROFILE
        </div>
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
