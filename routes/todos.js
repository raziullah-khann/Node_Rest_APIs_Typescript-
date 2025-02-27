"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/add-todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo Added!', todo: newTodo });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tId = req.params.todoId;
    //Reaching out to exact todo data from array of todo
    const todoIndex = todos.findIndex(t => t.id === tId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'Updated Todo Successfully.', todos });
    }
    return res.status(404).json({ message: 'Could not find todo for this id.' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const tId = req.params.todoId;
    todos = todos.filter(t => t.id !== tId);
    res.status(200).json({ message: 'Deleted Todo Successfully.', todos });
});
exports.default = router;
