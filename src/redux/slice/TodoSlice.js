import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  loading: false,
};

const todoSlice = createSlice({
  initialState,
  name: "todo",
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
      return state;
    },
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    deleteTodo: (state, action) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todoList.splice(index, 1);
    },
  },
});

const { reducer, actions } = todoSlice;
const { setTodoList, addTodo, setLoading, deleteTodo } = actions;

export { setTodoList, addTodo, setLoading, deleteTodo };
export default reducer;
