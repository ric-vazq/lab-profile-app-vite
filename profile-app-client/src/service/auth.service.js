import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005',
});

const errorHandler = (err) => {
  throw err;
};

const signUp = () => {
  return api.get('/auth/signup');
};
