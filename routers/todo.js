const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const requireAuth = require('../middleware/requireAuth'); 



router.use(requireAuth);

// GET /api/todos 
router.get('/', todoController.getTodos);

// GET /api/todos/:id 
router.get('/:id', todoController.getTodoByID);

// POST /api/todos 
router.post('/', todoController.createTodo);

// PATCH /api/todos/:id 
router.patch('/:id', todoController.updateTodo);

// DELETE /api/todos/:id 
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
