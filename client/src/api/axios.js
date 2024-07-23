import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true // xra que setee las cookies
})

export default instance