import axios from "axios";

const todoApis = {
  getTodos: (URL) => {
    return axios.get(URL);
  },
  addTodo: (URL, data) => {
    return axios.post(URL, data);
  },
  deleteTodo: (URL, id) => {
    return axios.delete(`${URL}/${id}`);
  },
};

export default todoApis;
