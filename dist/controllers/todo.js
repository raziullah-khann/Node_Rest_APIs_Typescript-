"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodo = void 0;
let todos = [];
const getTodo = (req, res, next) => {
    res.status(200).json({ todos: todos });
};
exports.getTodo = getTodo;
const addTodo = (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Todo Added!", todo: newTodo });
};
exports.addTodo = addTodo;
const updateTodo = (req, res, next) => {
    const params = req.params;
    const tId = params.todoId;
    const body = req.body;
    //Reaching out to exact todo data from array of todo
    const todoIndex = todos.findIndex((t) => t.id === tId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res
            .status(200)
            .json({ message: "Updated Todo Successfully.", todos });
    }
    return res.status(404).json({ message: "Could not find todo for this id." });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const params = req.params;
    const tId = params.todoId;
    todos = todos.filter((t) => t.id !== tId);
    res.status(200).json({ message: "Deleted Todo Successfully.", todos });
};
exports.deleteTodo = deleteTodo;
