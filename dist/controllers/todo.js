"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodo = void 0;
const schema_1 = __importDefault(require("../models/schema"));
// Get all todos
const getTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield schema_1.default.find();
        res.status(200).json({ data: data });
    }
    catch (err) {
        next(err);
    }
});
exports.getTodo = getTodo;
// Add a new todo
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newTodo = new schema_1.default({
            name: body.name,
            quantity: body.quantity,
        });
        yield newTodo.save();
        res.status(201).json({ message: "Todo Added!", todo: newTodo });
    }
    catch (err) {
        next(err);
    }
});
exports.addTodo = addTodo;
// Update a todo
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params; // ✅ Destructure `todoId`
        const { name, quantity } = req.body;
        //Reaching out to database
        const todo = yield schema_1.default.findById(todoId);
        if (!todo) {
            return res
                .status(404)
                .json({ message: "Could not find todo for this id." });
        }
        todo.name = name;
        todo.quantity = quantity;
        yield todo.save();
        return res
            .status(200)
            .json({ message: "Updated Todo Successfully.", todo: todo });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        // Find the todo before deleting
        const todo = yield schema_1.default.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        // Delete the todo
        yield schema_1.default.findByIdAndDelete(todoId);
        res
            .status(200)
            .json({ message: "Deleted Todo Successfully.", deletedTodo: todo });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTodo = deleteTodo;
