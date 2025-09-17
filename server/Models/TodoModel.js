const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    priority: {
        type: String,
        default: "low"
    },
    completed: {
        type: String,
        default: "pending",
    },
    createdBy: {
        type: String,
        required: [true, "User ID is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Todo", todoSchema);