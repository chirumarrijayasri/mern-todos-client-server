import axios from 'axios';
const url = "http://localhost:9999/todos";
export const readTodos = () => axios.get(url);
export const createTodo = newTodo => {
    console.log('newTodo',newTodo)
   return axios.post(url, newTodo)};
export const updateTodo = (id, updatedTodo) => axios.patch(`${url}/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);