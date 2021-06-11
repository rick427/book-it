import Layout from '@/components/layout/Layout';
import Login from '@/components/auth/Login';
import {getSession} from 'next-auth/client';

export default function LoginPage() {
  return (
    <Layout title="Login">
      <Login/>
    </Layout>
  )
}

export async function getServerSideProps(ctx){
  const {req} = ctx;

  const session = await getSession({req});
  if(session){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}