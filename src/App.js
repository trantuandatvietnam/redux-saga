import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList.todoList);
  const loading = useSelector((state) => state.todoList.loading);
  const [todoValue, setTodoValue] = useState("");

  const handleAddTodo = () => {
    if (!todoValue) return;
    dispatch({ type: "ADD_TODO_REQUEST", payload: { title: todoValue } });
    setTodoValue("");
  };

  const handleClickDeleteTodo = async (todoId) => {
    if (!todoId) return;
    dispatch({ type: "DELETE_TODO_REQUEST", payload: todoId });
  };

  useEffect(() => {
    dispatch({ type: "GET_TODOS_REQUEST" });
  }, [dispatch]);
  return (
    <div className="px-[22px]">
      <div className="max-w-[460px] mx-auto bg-slate-200 h-[700px] shadow-xl mt-[48px] rounded-[4px] overflow-hidden">
        <div className="text-center bg-slate-300 py-[8px] shadow">
          <h1 className="font-bold text-blue-500 text-[24px] ">Todo App</h1>
        </div>
        <div className="flex gap-x-[8px] justify-between items-stretch mt-[24px] px-[12px]">
          <input
            className="outline-0 py-[8px] px-[12px] w-full flex-1"
            type="text"
            placeholder="Add your todo..."
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <div
            onClick={handleAddTodo}
            className="cursor-pointer bg-slate-500 flex items-center text-center px-[8px] py-[4px] text-white font-bold"
          >
            {loading ? <span>Loading...</span> : "Add"}
          </div>
        </div>
        <div className="px-[12px] mt-[18px] ">
          <h3 className="font-bold text-slate-500 text-[18px]">
            Your Todo List
          </h3>
          <ul className="mt-[8px] overflow-auto max-h-[440px] flex flex-col gap-y-[8px]">
            {todoList?.length > 0 ? (
              todoList.map((todo) => (
                <li
                  key={todo.id}
                  className="py-[4px] pl-[8px] pr-[4px] border border-[#ccc] flex items-center justify-between"
                >
                  <span>{todo.title}</span>
                  <div className="flex items-center gap-x-[8px]">
                    {/* <span className="block p-1 bg-green-500 text-white rounded-[2px] cursor-pointer text-[12px] active:opacity-0">
                      Edit
                    </span> */}
                    <span
                      onClick={() => handleClickDeleteTodo(todo.id)}
                      className="block p-1 bg-red-500 text-white rounded-[2px] cursor-pointer text-[12px] active:opacity-0"
                    >
                      Delete
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-red-500">todoList is empty</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
