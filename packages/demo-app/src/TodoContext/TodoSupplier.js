// @ts-check

import React, { useState, useCallback, useMemo } from "react";
import * as PropTypes from "prop-types";
import { TodoContext } from "./TodoContext";

export function TodoSupplier(props) {
  const { children } = props;

  const [todos, setTodos] = useState([
    {
      text: "Use Hooks",
      completed: true,
      id: 0
    }
  ]);

  const [visibilityFilter, setVisibilityFilterState] = useState("All");

  const addTodo = useCallback(
    text => {
      const newTodos = [
        ...todos,
        {
          id: Math.floor(Math.random() * 2 ** 32).toString(16),
          completed: false,
          text
        }
      ];
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

  const deleteTodo = useCallback(
    id => {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

  const editTodo = useCallback(
    (id, text) => {
      const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      );
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

  const completeTodo = useCallback(
    id => {
      const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

  const completeAllTodos = useCallback(
    id => {
      const newTodos = todos.map(todo => ({ ...todo, completed: true }));
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

  const clearCompletedTodos = useCallback(() => {
    const newTodos = todos.filter(t => t.completed === false);
    setTodos(newTodos);
  }, [todos, setTodos]);

  const getTodosCount = useCallback(() => todos.length, [todos]);

  const getCompletedCount = useCallback(
    () =>
      todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
    [todos]
  );

  // Visibility filter stuff
  const setVisibilityFilter = useCallback(
    type => setVisibilityFilterState(type),
    [setVisibilityFilterState]
  );

  const getFilteredTodos = useCallback(
    visibilityFilter => {
      switch (visibilityFilter) {
        case "All":
          return todos;
        case "Completed":
          return todos.filter(t => t.completed);
        case "Active":
          return todos.filter(t => !t.completed);
        default:
          throw new Error("Unknown filter: " + visibilityFilter);
      }
    },
    [todos]
  );

  const value = useMemo(
    () => ({
      todos: getFilteredTodos(visibilityFilter),
      visibilityFilter,
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAllTodos,
      clearCompletedTodos,
      getTodosCount,
      getCompletedCount,
      setVisibilityFilter
    }),
    [
      visibilityFilter,
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAllTodos,
      clearCompletedTodos,
      getTodosCount,
      getCompletedCount,
      setVisibilityFilter,
      getFilteredTodos
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

TodoSupplier.propTypes = {
  children: PropTypes.node
};
