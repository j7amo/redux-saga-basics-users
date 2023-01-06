import axios from 'axios';

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api';

export const getUsers = () => axios.get('/users', {
  params: {
    limit: 1000,
  },
});

export const createUser = ({ firstName, lastName }) => axios.post('/users', {
  firstName,
  lastName,
});

export const deleteUser = (id) => axios.delete(`/users/${id}`);
