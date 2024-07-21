import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";
import Toast from '../components/Toast';
import { useAuth } from "../context/AuthContext";
import NotTasksImage from "../components/NotTasksImage";

function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const { user } = useAuth();
  const location = useLocation();
  const [showToastLogin, setShowToastLogin] = useState(false);
  const [showToastSignup, setShowToastSignup] = useState(false);
  const [showToastCreateTask, setShowToastCreateTask] = useState(false);
  const [showToastUpdateTask, setShowToastUpdateTask] = useState(false);
  const [showToastDeleteTask, setShowToastDeleteTask] = useState(false);

  useEffect(() => {
    if (location.state?.fromLogin) setShowToastLogin(true);
    if (location.state?.fromSignup) setShowToastSignup(true);
    if (location.state?.fromCreateTask) setShowToastCreateTask(true);
    if (location.state?.fromUpdateTask) setShowToastUpdateTask(true);
  }, [location]);

  useEffect(() => {
    getTasks();
  }, []);

  // trae desde el TaskCard el "evento" taks deleted para yo mostrar aquí la toastDelete
  const handleDeleteTask = () => {
    setShowToastDeleteTask(true);
  }

  if (tasks.length === 0) return (
    <>
      <div>
        <NotTasksImage />
      </div>
      {showToastLogin && <Toast color="blue" message={`Bienvenido de nuevo ${user.username}`} position="bottom" />}
      {showToastSignup && <Toast color="green" message={`Bienvenido ${user.username}`} position="bottom" />}
    </>
  );

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} onDelete={handleDeleteTask}></TaskCard>
        ))}
      </div>
      {showToastLogin && <Toast color="blue" message={`Bienvenido de nuevo ${user.username}`} position="bottom" />}
      {showToastSignup && <Toast color="green" message={`Bienvenido ${user.username}`} position="bottom" />}
      {showToastCreateTask && <Toast color="green" message={`Task created`} position="bottom" time={1500} />}
      {showToastUpdateTask && <Toast color="blue" message={`Task updated`} position="bottom" time={1500} />}
      {showToastDeleteTask && <Toast color="red" message={`Task deleted`} position="bottom" time={1500} />}
    </div>
  )
}

export default TasksPage;