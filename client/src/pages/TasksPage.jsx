import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [])

  if (tasks.lenght === 0) return (<div>No hay tasks</div>);

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id}></TaskCard>
        ))}
      </div>
    </div>
  )
}

export default TasksPage;