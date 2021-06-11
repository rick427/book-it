import { useState } from 'react';
import {signIn} from 'next-auth/client'
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import ButtonLoader from '@/components/layout/ButtonLoader';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      email, 
      password,
      redirect: false
    });
    setLoading(false);
    if(res.error){
      toast.error(res.error);
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
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
  
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

            <a href="#" className="float-right mb-4">Forgot Password?</a>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? <ButtonLoader/> : 'Login'}
            </button>

            <a href="#" className="float-right mt-3">New User?</a>
          </form>
		  </div>
    </div>
</div>
    )
}
