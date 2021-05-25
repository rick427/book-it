import Layout from '@/components/layout/Layout';
import {wrapper} from '@/redux/store';
import {getRoomDetails} from '@/redux/actions/room-actions';
import RoomDetails from '@/components/room/RoomDetails';

export default function RoomPage() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {req, store, params} = ctx;
  await store.dispatch(getRoomDetails(req, params.id));
})