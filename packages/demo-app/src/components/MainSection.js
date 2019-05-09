import React, { useContext } from "react";
import Footer from "./Footer";
import TodoList from "../components/TodoList";
import { TodoContext } from "../TodoContext/TodoContext";

const MainSection = () => {
  const {
    completeAllTodos,
    clearCompletedTodos,
    getCompletedCount,
    getTodosCount
  } = useContext(TodoContext);

  const todosCount = getTodosCount();
  const completedCount = getCompletedCount();
  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            defaultChecked={completedCount === todosCount}
          />
          <label onClick={completeAllTodos} />
        </span>
      )}
      <TodoList />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={clearCompletedTodos}
        />
      )}
    </section>
  );
};

export default MainSection;
