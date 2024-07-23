import { useContext, useState } from "react";
import { createContext } from "react"
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      console.log(res.data);
      if (Array.isArray(res.data)) {
        const sortedTasks = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTasks(sortedTasks);
      } else {
        console.error('Data received is not an array', res.data);
        setTasks([]); // Set tasks to an empty array as a fallback
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log('TaskContext - createTask res', res);
      if (res.status === 200) { 
        setTasks(prevTasks => [...prevTasks, res.data]); // Añade la nueva tarea al estado
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      console.log(res);
      if (res.status === 204) setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      if (res.status === 200) {
        console.log('TaskContext - updateTask res', res);
        setTasks(prevTasks => prevTasks.map(task => task._id === id ? res.data : task));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, getTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}