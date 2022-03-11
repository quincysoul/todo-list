import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App, todoContainer">
      <TodoList />
    </div>
  );
}

export default App;
