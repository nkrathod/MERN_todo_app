import React from "react";
import "../components/styles/Todo.css";

const TodoComponent = ({ data, handleUpdate, handleDelete }) => {
  const deleteTodo = (todoId, e) => {
    e.stopPropagation();
    handleDelete(todoId);
  };
  return (
    <div className="todo-item" onClick={() => handleUpdate(data)}>
      <div className="header-todo">
        <span className="icon">
          {data.completed ? (
            <i className="fa-solid fa-circle-check"></i>
          ) : (
            <i className="fas fa-tasks"></i>
          )}
        </span>
        <h2 className="title">{data.title}</h2>
        <span className="delete-icon" onClick={(e) => deleteTodo(data._id, e)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
      <p className="description">{data.description}</p>
    </div>
  );
};
export const Todo = React.memo(TodoComponent);
