import Layout from '@/components/layout/Layout';
import Register from '@/components/auth/Register';
import {getSession} from 'next-auth/client';

export default function RegisterPage() {
  return (
    <Layout title="Register">
      <Register/>
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