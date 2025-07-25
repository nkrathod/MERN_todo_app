import React, { useEffect } from "react";
import "../components/styles/TodoModal.css";

const TodoModalComponent = ({
  isOpen,
  onClose,
  onSubmit,
  todoData,
  error,
  setError,
}) => {
  const [title, setTitle] = React.useState(todoData?.title || "");
  const [description, setDescription] = React.useState(
    todoData?.description || ""
  );
  const [status, setStatus] = React.useState(
    todoData?.completed ? "completed" : "pending"
  );

  useEffect(() => {
    setTitle(todoData?.title || "");
    setDescription(todoData?.description || "");
    setStatus(todoData?.completed ? "completed" : "pending");
    setError && setError("");
  }, [todoData, setError]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Please fill in all required fields.");
      return;
    }
    const todo = {
      title,
      description,
      completed: status === "completed" ? true : false,
    };

    console.log("Submitting todo:", todo);
    setError("");
    setTitle("");
    setDescription("");
    setStatus("pending");
    onSubmit(todo);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{todoData ? "Edit Todo" : "Add Todo"}</h2>
        <form onSubmit={handleSubmit} className="todo-form">
          <label className="label">
            Title <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-field"
          />
          <label className="label">
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-field"
          />
          <label className="label">
            Status <span style={{ color: "red" }}>*</span>
          </label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e)}
            className="status-field"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="button-row">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export const TodoModal = React.memo(TodoModalComponent);
