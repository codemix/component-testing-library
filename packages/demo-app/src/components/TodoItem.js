import React, { useState, useContext } from "react";
import classnames from "classnames";
import TodoTextInput from "./TodoTextInput";
import { TodoContext } from "../TodoContext/TodoContext";

export const TodoItem = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const { editTodo, deleteTodo, completeTodo } = useContext(TodoContext);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id, text) => {
    if (text.length === 0) {
      deleteTodo(id);
    } else {
      editTodo(id, text);
    }
    setEditing(false);
  };

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={text => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
    );
  }

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing
      })}
    >
      {element}
    </li>
  );
};
