import React from 'react';
import TodoObj from '../../types/Task';

interface TodoListContextObj {
  todos: TodoObj[],
  toggleTodo: Function
}

const todoListContext: React.Context<any> = React.createContext({});

export default todoListContext;
