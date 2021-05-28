import {useState} from 'react';
import {useRouter} from 'next/router';

export default function Search() {
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState('');
    const [category, setCategory] = useState('');

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if(location.trim()){
            router.push(`/?location=${location}&guests=${guests}&category=${category}`)
        }
        else{
            router.push('/');
        }
    }

    return (
        <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h2 className="mb-3">Search Rooms</h2>
            <div className="form-group">
              <label htmlFor="location_field">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_field"
                placeholder="new york"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="guest_field">No. of Guests</label>
              <select className="form-control" id="guest_field" onChange={e => setGuests(e.target.value)} value={guests}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="room_type_field">Room Type</label>
              <select className="form-control" id="room_type_field" onChange={e => setCategory(e.target.value)} value={category}>
                <option>King</option>
                <option>Single</option>
                <option>Twins</option>
              </select>
            </div>

            <button type="submit" className="btn btn-block py-2">Search</button>
          </form>
        </div>
      </div>
    </div>
    )
}
