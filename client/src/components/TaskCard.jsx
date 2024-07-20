import PropTypes from 'prop-types';
import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';

TaskCard.propTypes = {
  task: PropTypes.object.isRequired
};

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md mb-4'>
      <header className='flex justify-between mb-2'>
        <h1 className='text-2xl font-bold'>{task.title}</h1>
        <div className='flex justify-center gap-x-4'>
          <Link to={`/tasks/${task._id}`} className='bg-blue-600 rounded-md px-2 text-center flex items-center'><i className="fa-solid fa-pen-to-square"></i></Link>
          <button className='bg-red-600 rounded-md px-2' onClick={() => { deleteTask(task._id) }}><i className="fa-solid fa-trash"></i></button>
        </div>
      </header>
      <div className='flex flex-col h-full pb-5'>
        <div className='flex-grow'>
          <p className='text-slate-300'>{task.description}</p>
        </div>
        <div className='mt-auto'>
          <div className='flex justify-end'>
            <p>{new Date(task.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;