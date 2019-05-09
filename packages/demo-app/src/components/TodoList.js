import React, { useContext } from "react";
import { TodoContext } from "../TodoContext/TodoContext";
import { TodoItem } from "./TodoItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
