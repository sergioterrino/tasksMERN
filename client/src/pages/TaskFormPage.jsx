import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams(); // me trae todos los params de la url

  const onSubmit = handleSubmit((data) => {
    if (!params.id) {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format()
      });
    } else {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format()
      });
    }
    navigate('/tasks');
  })

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const dataTask = await getTask(params.id);
        setValue('title', dataTask.title);
        setValue('description', dataTask.description);
        setValue('date', dayjs.utc(dataTask.date).format('YYYY-MM-DD'));
      }
    };
    loadTask();
  });

  return (
    <div className='flex justify-center items-center h-[calc(96vh-100px)]'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" {...register('title', { required: true })}
            placeholder="Title" className='w-full bg-zinc-700 px-4 py-2 my-2 mb-4 rounded-md' autoFocus />
          {errors.title && (<p className='text-red-500'>title is required</p>)}
          <label htmlFor="description">Description</label>
          <textarea {...register('description', { required: true })} placeholder="Description"
            className='w-full bg-zinc-700 px-4 py-2 mb-2 mt-2 rounded-md' rows={3}></textarea>
          {errors.description && (<p className='text-red-500'>description is required</p>)}
          <label htmlFor="date"></label>
          <input type="date" {...register('date', {required: true})} className='w-full bg-zinc-700 px-4 py-2 my-2 rounded-md' />
          {errors.date && (setValue('date', new Date().toISOString().split('T')[0]))}
          <button type='submit' className='w-full border border-zinc-500 rounded-md p-2 
          font-bold mt-5 hover:text-zinc-800 hover:bg-white'>Save Task</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage