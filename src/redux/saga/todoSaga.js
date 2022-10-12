import { all, put, takeEvery } from "redux-saga/effects";
import todoApis from "../../apis";
import {
  setTodoList,
  addTodo,
  setLoading,
  deleteTodo,
} from "../slice/TodoSlice";

function* getTodos() {
  const todos = yield todoApis.getTodos(
    "https://63464e619eb7f8c0f8785aeb.mockapi.io/api/v1/todos"
  );
  yield put(setTodoList(todos.data));
}

function* addTodoSaga(data) {
  yield put(setLoading(true));
  const todo = yield todoApis.addTodo(
    "https://63464e619eb7f8c0f8785aeb.mockapi.io/api/v1/todos",
    data.payload
  );
  yield put(setLoading(false));
  yield put(addTodo(todo.data));
}

function* deleteTodoSaga(data) {
  yield todoApis.deleteTodo(
    "https://63464e619eb7f8c0f8785aeb.mockapi.io/api/v1/todos",
    data.payload
  );
  yield put(deleteTodo(data.payload));
}

function* promiseRequest() {
  yield takeEvery("GET_TODOS_REQUEST", getTodos);
  yield takeEvery("ADD_TODO_REQUEST", addTodoSaga);
  yield takeEvery("DELETE_TODO_REQUEST", deleteTodoSaga);
}

export default function* rootSaga() {
  yield all([promiseRequest()]);
}
