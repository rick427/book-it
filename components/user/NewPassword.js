import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

import {resetPassword, clearErrors} from '@/redux/actions/user-actions';
import ButtonLoader from '@/components/layout/ButtonLoader';

export default function NewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const dispatch = useDispatch();
    const {error, loading, success} = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(success){
            router.push('/login');
        }
    }, [dispatch, error, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            password,
            confirmPassword
        };

        dispatch(resetPassword(router.query.token, userData));
    }

    return (
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_password_field">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password_field"
                        className="form-control"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    id="new_password_button"
                    type="submit"
                    className="btn btn-block py-3" 
                    disabled={loading}
                >
                    {loading ? <ButtonLoader/> : 'Set Password'}
                </button>

            </form>
        </div>
    </div>
    )
}
