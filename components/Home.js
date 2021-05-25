import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector, useDispatch} from 'react-redux';
import RoomItem from '@/components/room/RoomItem';
import { toast } from 'react-toastify';
import { clearErrors } from '@/redux/actions/room-actions';
import Pagination from 'react-js-pagination'

export default function Home() {
    const {rooms, resPerPage, roomsCount, filteredRoomsCount, error} = useSelector(state => state.allRooms);

    const dispatch = useDispatch();
    const router = useRouter();

    let {page = 1} = router.query;
    page = +page;

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    }, []);

    const handlePagination = (pageNumber) => {
        router.push(`/?page=${pageNumber}`);
    } 

    return (
        <>
        <section id="rooms" className="container mt-5">

            <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

            <a href='#' className='ml-2 back-to-search'>
                <i className='fa fa-arrow-left'></i> 
                Back to Search
            </a>
            <div className="row">
                {rooms & rooms.length === 0 ? (
                    <div className="alert alert-danger">
                        No Rooms.
                    </div>
                ) : rooms && rooms.map(room => (
                    <RoomItem key={room._id} room={room}/>
                ))}
            </div>
        </section>

        {resPerPage < roomsCount && (
            <div className="d-flex justify-content-center mt-5">
                <Pagination
                    activePage={page}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={roomsCount}
                    onChange={handlePagination}
                    nextPageText={'Next'}
                    prevPageText={'Prev'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        )}
        </>
    )
}
