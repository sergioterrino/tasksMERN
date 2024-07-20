/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    login(values);
  })

  return (
    <div className='flex h-[calc(96vh-100px)] justify-center items-center'>
      <div className='max-w-md bg-zinc-800 p-10 w-full rounded-md '>
        {
          loginErrors.map((err, i) => (<div key={i} className='bg-red-700 text-white font-bold text-center p-2 my-2'>{err}</div>))
        }
        <h1 className='text-center font-bold text-3xl mb-4'>Login</h1>
        <form onSubmit={onSubmit}>

          <input type="email" {...register('email', { required: true })}
            className="w-full rounded-md bg-zinc-700 px-4 py-2 my-2" placeholder="Email" />
          {errors.email && <p className='text-red-500'>email is required</p>}

          <input type="password" {...register('password', { required: true, min: 8 })}
            className="w-full rounded-md bg-zinc-700 px-4 py-2 my-2" placeholder="Password" />
          {errors.password && <p className='text-red-500'>password is required</p>}

          <button type="submit" className='flex justify-center w-full border border-zinc-500 
          rounded-md p-2 mt-5 font-bold hover:bg-white hover:text-zinc-800'>Login</button>

        </form>
        <div className='mt-10 '>
          <p className='text-center'>You dont have a account? &nbsp;
            <Link to="/signup" className='font-bold text-sky-500 hover:text-sky-400'>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage