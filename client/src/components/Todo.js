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
          {data.completed === "completed" ? (
            <i className="fa-solid fa-circle-check"></i>
          ) : data.completed === "inprogress" ? (
            <i class="fas fa-hourglass-half"></i>
          ) : data.completed === "pending" ? (
            <i class="fas fa-clock"></i>
          ) : (
            <i class="fas fa-shopping-cart"></i>
          )}

          {/* {data.completed === "ready" && <i class="fas fa-hourglass-half"></i>}
          {data.completed === "inprogress" && <i class="fas fa-undo-alt"></i>}
          {data.completed === "completed" && (
            <i class="fas fa-hourglass-half"></i>
          )} */}
        </span>
        <h2 className="title">{data.title}</h2>
        <sapn
          className={`priority ${
            data.priority === "medium"
              ? "medium"
              : data.priority === "high"
              ? "high"
              : ""
          }`}
        >
          {data.priority ? data.priority : "Low"}
        </sapn>
        <span className="delete-icon" onClick={(e) => deleteTodo(data._id, e)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
      <p className="description">{data.description}</p>
    </div>
  );
};
export const Todo = React.memo(TodoComponent);
