/* eslint-disable no-undef */
import axios from './axios.js';

export const getTasksRequest = () => axios.get('/tasks');

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`, id)

export const createTaskRequest = (task) => axios.post('/tasks', task);

export const updateTaskRequest = (id, task) => axios.put(`/tasks/update/${id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/tasks/delete/${id}`, id);