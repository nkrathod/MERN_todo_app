import React, { useEffect, useContext } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import AuthContext from "../helpers/authContext";
import { Todo } from "./Todo";
import { TodoModal } from "./TodoModal";
import "../components/styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userDetails, setUserDeatils } = useContext(AuthContext);
  const [todos, setTodos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [todoData, setTodoData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const openModal = () => {
    setError("");
    setIsOpen(true);
  };

  const onClose = () => {
    setError("");
    setIsOpen(false);
    setTodoData(null); // Reset todoData when closing the modal
  };

  const handleUpdateTodo = (data) => {
    setTodoData(data);
    openModal();
  };

  const addTodo = (data) => {
    if (data && data.title && data.description) {
      axiosInstance
        .post("/todo/create", {
          createdBy: userDetails.username,
          title: data.title,
          description: data.description,
          completed: data.completed,
        })
        .then((response) => {
          setError("");
          setTodos((prevTodos) => [...prevTodos, response.data.todo]);
          onClose();
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
          setError("Failed to add todo. Please try again.");
        });
    }
  };

  const handleSubmit = (data) => {
    if (todoData && todoData !== null) {
      axiosInstance
        .put(`/todo/update?todoId=${todoData._id}`, {
          title: data.title,
          description: data.description,
          completed: data.completed,
          userId: userDetails.username,
        })
        .then((response) => {
          setError("");
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === todoData._id ? response.data.todo : todo
            )
          );
          onClose();
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
          setError("Failed to update todo. Please try again.");
        });
    } else {
      addTodo(data);
    }
  };

  const handleDeleteTodo = (todoId) => {
    axiosInstance
      .delete(`/todo/delete?todoId=${todoId}`)
      .then((response) => {
        if (response.data) {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== todoId)
          );
          setError("");
        } else {
          console.error("Todo not found or already deleted");
          setError("Todo not found or already deleted.");
        }
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        setError("Failed to delete todo. Please try again.");
      });
  };

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/todo/get", {
        params: { userId: userDetails.username },
      });
      if (response.data && response.data.todos) {
        return response.data.todos;
      } else {
        console.error("No todos found in the response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (userDetails && userDetails.username) {
      fetchTodos().then((data) => {
        if (!data) return;
        let filteredTodos = data;
        if (filter === "completed") {
          filteredTodos = data.filter((todo) => todo.completed);
        } else if (filter === "pending") {
          filteredTodos = data.filter((todo) => !todo.completed);
        }
        setTodos(filteredTodos);
      });
    }
  }, [isLoggedIn, userDetails, filter, navigate]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "null") {
      setUserDeatils(JSON.parse(userData));
    } else {
      setUserDeatils(null);
    }
  }, [isLoggedIn, setUserDeatils]);

  return (
    <div className="home-container">
      <h1 className="home-title">
        Hi {userDetails && userDetails.firstname}, Welcome to the MERN Todo App
      </h1>
      <div className="todo-section">
        <div className="todo-header">
          <div className="todo-header-row">
            <h2 className="your-todo">
              Your Todos (<span className="total-count">{todos.length}</span>)
            </h2>
          </div>
          <div className="todo-header-actions">
            <div className="todo-actions">
              Filter :
              <select
                className="filter-select"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button className="add-todo-button" onClick={() => openModal()}>
              Add Todo
            </button>
          </div>
        </div>
        <div className="todo-container">
          {todos.length > 0
            ? todos.map((todo) => (
                <Todo
                  key={todo._id}
                  data={todo}
                  handleUpdate={handleUpdateTodo}
                  handleDelete={handleDeleteTodo}
                />
              ))
            : ""}
        </div>
      </div>
      <TodoModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        todoData={todoData}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default Home;
