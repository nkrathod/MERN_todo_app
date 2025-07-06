const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const todoRoute = require("./Routes/TodoRoute");
// const { MONGO_URL, PORT } = process.env;

const PORT = 4000;
const DB_URL =
  "mongodb+srv://nkrathod:nkr1430@todo-app.ra7k9lw.mongodb.net/todo_db?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: true, // allow all origins, including Postman ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/todo/", todoRoute);
