import React, { useEffect, useState } from "react";
import TodoItem from "../todoItem/TodoItem";
import "./todo.scss";
var shortid = require("shortid");

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [empty, setEmpty] = useState([]);

  const addTodoItem = (value) => {
    const newTodo = [
      { title: value, complete: false, id: shortid.generate() },
      ...todo,
    ];
    console.log(newTodo);
    setTodo(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  const completeTodo = (id, index) => {
    console.log(id);
    const newTodo = [...todo];
    newTodo.map((todo) => {
      todo.id === id ? (todo.complete = !todo.complete) : null;
    });
    const filterArray = newTodo.filter((todo) => todo.id !== id);
    {
      newTodo[index].complete
        ? localStorage.setItem(
            "todo",
            JSON.stringify([...filterArray, newTodo[index]])
          )
        : localStorage.setItem(
            "todo",
            JSON.stringify([newTodo[index], ...filterArray])
          );
    }
    {
      newTodo[index].complete
        ? setTodo([...filterArray, newTodo[index]])
        : setTodo([newTodo[index], ...filterArray]);
    }
  };

  const deleteTodo = (index) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    console.log(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));
    setTodo(newTodo);
  };

  const resetTodo = () => {
    localStorage.setItem("todo", JSON.stringify([...empty]));
    setTodo([...empty]);
  };

  useEffect(() => {
    var retrievedData = localStorage.getItem("todo");
    var todo = JSON.parse(retrievedData);
    console.log(todo);
    {todo && setTodo(todo)}
  }, []);

  return (
    <div className="todo">
      <div className="resetbtn">
        <button
          onClick={() => {
            resetTodo();
          }}
        >
          <i class="fa-solid fa-arrow-rotate-right">
            <span>RESET</span>
          </i>
        </button>
      </div>
      <div className="inputTodo">
        <div className="input">
          <input
            type="text"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </div>
        <div className="button">
          <button
            className="addBtn"
            onClick={() => {
              addTodoItem(todoValue);
            }}
          >
            <i class="fa-solid fa-clipboard-list">
              <span>Add Todo</span>
            </i>
          </button>
        </div>
      </div>
      <div className="showTodo">
        <div className="todoList">
          {todo.length==0 ? <div className="todoEmpty">
            <h2>Add todo for your daily Routines</h2>
          </div>:
          todo.map((todo, index) => {
            return (
              <TodoItem
                todo={todo}
                index={index}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
