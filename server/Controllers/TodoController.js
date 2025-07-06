const Todo = require("../Models/TodoModel");

module.exports.CreateTodo = async (req, res, next) => {
    try {
        const { title, description, createdBy, completed } = req.body;
        if (!title || !description || !createdBy) {
            return res.status(400).json({ message: "Title, description, and user ID are required" });
        }
        const todo = await Todo.create({
            title,
            description,
            createdBy,
            completed: completed || false // Default to false if not provided
        });
        res.status(201).json({ message: "Todo created successfully", todo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.GetTodos = async (req, res, next) => {
    try {
        console.log("Fetching todos for user:", req.query.userId);
        const todos = await Todo.find({ createdBy: req.query.userId });
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.UpdateTodo = async (req, res, next) => {
    try {
        const todoId = req.query.todoId;
        const {title, description, completed, userId } = req.body;
        console.log(`User ${userId} updating todo with ID: ${todoId}`);
        if (!todoId || !title || !description) {
            return res.status(400).json({ message: "Todo ID, title, and description are required" });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { title, description, completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.DeleteTodo = async (req, res, next) => {
    try {
        const todoId = req.query.todoId;
        if (!todoId) {
            return res.status(400).json({ message: "Todo ID is required" });
        }
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}