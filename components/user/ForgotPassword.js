import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import {forgotPassword, clearErrors} from '@/redux/actions/user-actions';
import ButtonLoader from '@/components/layout/ButtonLoader';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const {error, loading, message} = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(message){
            toast.success(message);
        }
    }, [dispatch, error, message]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {email};

        dispatch(forgotPassword(userData));
    }
    return (
        <div class="row wrapper">
        <div class="col-10 col-lg-5">
            <form class="shadow-lg" onSubmit={submitHandler}>
                <h1 class="mb-3">Forgot Password</h1>
                <div class="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        class="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    class="btn btn-block py-3" 
                    disabled={loading}
                >
                   {loading ? <ButtonLoader/> : 'Send Email'}
                </button>

            </form>
        </div>
    </div>
    )
}
