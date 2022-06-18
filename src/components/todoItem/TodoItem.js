import React from "react";
import "./todoItem.scss";

const TodoItem = ({ todo, index, completeTodo, deleteTodo }) => {
  return (
    <div className="todoItem">
      <div
        className="todo"
        style={{ textDecoration: todo.complete ? "line-through" : "" }}
      >
        <div className="left">
          <div className="completeBtn">
            <i
              class="fa-solid fa-clipboard-check"
              style={{ color: todo.complete ? "rgb(37 185 103)" : "" }}
              onClick={() => {
                completeTodo(todo.id, index);
              }}
            ></i>
          </div>
          <div className="title">
            <span>{todo.title}</span>
          </div>
        </div>
        <div className="right">
          <i
            class="fa-solid fa-trash-can"
            onClick={() => {
              deleteTodo(index);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
