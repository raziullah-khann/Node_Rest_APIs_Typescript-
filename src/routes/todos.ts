import { Router } from "express";
import { getTodo, addTodo, updateTodo, deleteTodo } from "../controllers/todo";

const router = Router();

router.get("/", getTodo);

router.post("/add-todo", addTodo);

router.put("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteTodo);

export default router;