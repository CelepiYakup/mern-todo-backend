const mongoose = require('mongoose');
const Todo = require('../dbTodos');

// Get a Todo
const getTodos = async (req, res) => {
  try {
    const user_id = req.user._id;
    const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodoByID = async (req, res) => {
    const { id } = req.params;
    try {
        // Check the id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with the id of ${id}`);
        }

        const todo = await Todos.findById(id);

        if (!todo) {
            return res.status(404).send(`There is no todo with the id of ${id}`);
        }

        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create new Todo
const createTodo = async (req, res) => {
  const dbTodo = req.body;
  try {
    const newTodo = await Todo.create({ ...dbTodo, user_id: req.user._id });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json(`No Todo found with ID ${id}`);
    }
    const todoID = { _id: id };
    const update = { completed: true };
    const updatedTodo = await Todo.findOneAndUpdate(todoID, update);
    if (!updatedTodo) {
      return res.status(404).json(`No Todo found with ID ${id}`);
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json(`No Todo found with ID ${id}`);
    }
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
