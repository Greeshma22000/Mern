import Todo from "../models/todoModels.js";

// GET ALL TODOS
export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// CREATE TODO
export const postTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const todo = await Todo.create({ text });
    res.status(201).json(todo);
  } catch (error) {
    console.error("POST TODO ERROR:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE TODO
export const putTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
};

// DELETE TODO
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
};
