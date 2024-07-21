/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: signupErrors } = useAuth(); // Obtenemos la función signup del contexto
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Si el usuario está autenticado, lo redirigimos a la página de tareas
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks', { state: { fromSignup: true } });
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    signup(values);
  });

  return (
    <div className='flex items-center justify-center h-[calc(90vh-100px)]'>
      <div className="max-w-md bg-zinc-800 p-10 rounded-md w-full">
        {
          signupErrors.map((err, i) => (<div key={i} className="bg-red-500 p-2 my-2 text-white font-bold text-center">{err}</div>))
        }
        <h1 className='text-3xl font-bold text-center mb-4'>Register</h1>
        <form onSubmit={onSubmit}>

          <input type="text" {...register('username', { required: true })}
            className="bg-zinc-700 w-full text-white px-4 py-2 my-2 rounded-md" placeholder="Username" />
          {
            errors.username && <p className="text-red-500">This Username is required</p>
          }
          <input type="email" {...register('email', { required: true })}
            className="bg-zinc-700 w-full px-4 py-2 my-2 rounded-md" placeholder="Email" />
          {
            errors.email && <p className="text-red-500">Email is required</p>
          }
          <input type="password" {...register('password', { required: true })}
            className="bg-zinc-700 w-full px-4 py-2 my-2 rounded-md" placeholder="Password" />
          {
            errors.password && <p className="text-red-500">Password is required</p>
          }

          <button type="submit" className='flex justify-center w-full border border-zinc-500 
          rounded-md p-2 mt-4 font-bold hover:bg-white hover:text-zinc-800'>Create</button>

        </form>
        <div className='mt-10'>
          <p className='text-center'>Do you already have an account? &nbsp;
            <Link to="/login" className='font-bold text-sky-500 hover:text-sky-400'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage