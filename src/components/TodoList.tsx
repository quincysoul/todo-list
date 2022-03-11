import {
  IconButton, List, Skeleton, TextField,
} from '@mui/material';
import {
  ReactElement, useCallback, useMemo, useRef, useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PublishIcon from '@mui/icons-material/Publish';
import TodoObj from '../../types/Task';
import TodoListContext from '../context/todoListContext';
import useGetTodosv1 from '../hooks/useGetTodosv1';
import Todo from './Todo';

function TodoList() {
  // Note: Normally we don't use a local setData like this.
  // But to save time only doing "frontend" without api POST
  const {
    data, setData, error, loading,
  } = useGetTodosv1();
  const [makeTodoName, setMakeTodoName] = useState('');
  const toggleSelection = useCallback((selectedTask: TodoObj) => {
    const selectedId = selectedTask.id;
    setData((prevState: TodoObj[]) => prevState.map((todo: TodoObj): TodoObj => {
      if (todo.id === selectedId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  }, [setData]);

  const makeTodo = () => {
    setData((prev: any) => [...data, {
      id: uuidv4(),
      name: makeTodoName,
      description: '',
      order: prev.length,
    }]);
    setMakeTodoName('');
  };

  const modifyTodo = useCallback((
    todoId: string,
    {
      completed, name, description, remove = false, order, move,
    },
  ) => {
    setData((prevState: TodoObj[]) => {
      if (remove) {
        return prevState.filter((todo: TodoObj) => todo.id !== todoId);
      }
      if (order) {
        const newIndex = order + move;
        if (prevState.length <= newIndex || newIndex < 0) return prevState;
        // const todoToMove = { ...prevState[order] };
        // const todoToSwap = { ...prevState[newIndex] };
        // console.log('move todoToMove', todoToMove, 'to index', newIndex);
        // return prevState.map((element, i) => {
        //   if (i === newIndex) return { ...todoToMove, order };
        //   if (i === order) return { ...todoToSwap, order: newIndex };
        //   return element;
        // });
      }
      return prevState.map((todo: TodoObj): TodoObj => {
        const modifiedTodo: Partial<TodoObj> = {};
        if (completed !== undefined) modifiedTodo.completed = completed;
        if (name) modifiedTodo.name = name;
        if (description) modifiedTodo.description = description;
        if (todo.id === todoId) {
          return {
            ...todo, ...modifiedTodo,
          };
        }
        return todo;
      });
    });
  }, [setData]);

  const contextValue = useMemo(() => ({ ...data, modifyTodo }), [data, modifyTodo]);

  const renderSkeletonTodos = () => [...Array(5)].map(() => (<Skeleton key={uuidv4()} variant="rectangular" width="100%" height="3em" sx={{ mb: 3 }} />));
  const renderTodoItems = (items: TodoObj[]) => {
    console.log('items:', items);

    const sortedItems = items.sort((a: TodoObj, b: TodoObj): number => a.order - b.order);
    return sortedItems.map((item: TodoObj) => {
      const {
        id, completed, name, description, order,
      } = item;
      return (
        <Todo
          key={id}
          id={id}
          completed={completed}
          name={name}
          description={description}
          order={order}
          handleToggle={() => {}}
        />
      );
    });
  };

  return (
    <TodoListContext.Provider value={contextValue}>
      <h1>Todo List</h1>
      <List>
        {!loading ? renderTodoItems(data || [] as any) : renderSkeletonTodos()}
      </List>
      <TextField
        id="outlined-basic"
        value={makeTodoName}
        label="New Todo"
        variant="outlined"
        onChange={
        (e) => {
          setMakeTodoName(e.target.value);
        }
      }
      />
      <IconButton
        aria-label="submit-todo"
        onClick={() => makeTodo()}
      >
        <PublishIcon />
      </IconButton>
    </TodoListContext.Provider>
  );
}

export default TodoList;
