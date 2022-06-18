import React from 'react'
import Todo from './components/todo/Todo';
import './app.scss';

 const App =() =>{
  return (
    <div className='App'>
      <h1>Todo App</h1>
      <Todo />
    </div>
  )
}

export default App