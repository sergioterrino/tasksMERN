import axios from './axios.js';

// cuando se ejecute le pasaran un user, manda el post al backend
export const signupRequest = (user) => axios.post(`/signup`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get('/verifyToken');
