import { useState, useEffect } from 'react';
import {signIn} from 'next-auth/client'
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

import {registerUser, clearErrors} from '@/redux/actions/user-actions'
import ButtonLoader from '@/components/layout/ButtonLoader';

export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/avatar.jpg');

    const {name, email, password} = user;

    const {loading, error, success} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(success){
            router.push('/login');
        }

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, success]);

    const submitHandler = e => {
        e.preventDefault();

        const userData = {name, email, password, avatar};

        dispatch(registerUser(userData));
    }

    const handleChange = e => {
        const {name, value, files} = e.target;
        if(name === 'avatar'){
            const reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
        }
        else{
            setUser({...user, [name]: value});
        }
    }

    return (
        <div className="container container-fluid">
        <div className="row wrapper"> 
		    <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
                <label htmlFor="name_field">Full Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  name="name"
                  onChange={handleChange}
                />
              </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                  name="email"
                  onChange={handleChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                  name="password"
                  onChange={handleChange}
              />
            </div>

            <div className='form-group'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='d-flex align-items-center'>
                    <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                src={avatarPreview}
                                className='rounded-circle'
                                alt='image'
                            />
                        </figure>
                    </div>
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept="images/*"
                            onChange={handleChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Avatar
                        </label>
                    </div>
                </div>
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? <ButtonLoader/> : 'REGISTER'}
            </button>
          </form>
		  </div>
    </div>
</div>
    )
}