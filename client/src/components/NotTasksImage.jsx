import notTasksImage from '../assets/images/notTasks.gif';

function NotTasksImage() {
  return (
    <div className='my-16'>
      <img src={notTasksImage} alt="Not tasks" className="w-56 h-56 md:w-72 md:h-72 mx-auto mb-3 rounded-full mask-gradient" />
      <h1 className="text-3xl font-bold text-center">You don&apos;t have tasks</h1>
    </div>
  )
}

export default NotTasksImage