const { CreateTodo, GetTodos, UpdateTodo, DeleteTodo} = require("../Controllers/TodoController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

// Route to create a new todo
router.post("/create", userVerification, CreateTodo);
// Route to get all todos for a user
router.get("/get", userVerification, GetTodos);
router.put("/update", userVerification, UpdateTodo);
router.delete("/delete", userVerification, DeleteTodo);

module.exports = router;
