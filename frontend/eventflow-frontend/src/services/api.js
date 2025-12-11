import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  // Faz 4'te interceptors, auth token ve error handler eklenecek
});

export default api;





