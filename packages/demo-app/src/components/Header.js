import React, { useContext } from "react";
import TodoTextInput from "./TodoTextInput";
import { TodoContext } from "../TodoContext/TodoContext";

const Header = () => {
  const { addTodo } = useContext(TodoContext);

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            addTodo(text);
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
