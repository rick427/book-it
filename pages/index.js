import Layout from '@/components/layout/Layout';
import Home from '@/components/Home';
import {wrapper} from '@/redux/store';
import {getRooms} from '@/redux/actions/room-actions';

export default function HomePage() {
  return (
    <Layout>
      <Home/>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {req, store, query} = ctx;
  await store.dispatch(getRooms(req, query.page, query.location, query.guests, query.category));
})