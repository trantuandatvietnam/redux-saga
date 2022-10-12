import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/todoSaga";
import todoReducer from "./slice/TodoSlice";

export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todoList: todoReducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);
export default store;
