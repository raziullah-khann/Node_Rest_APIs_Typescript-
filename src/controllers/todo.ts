import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

export const getTodo = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ todos: todos });
};

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);

  res.status(201).json({ message: "Todo Added!", todo: newTodo });
};

export const updateTodo = (req: Request, res: Response, next: NextFunction): any => {
  const params = req.params as RequestParams;
  const tId = params.todoId;
  const body = req.body as RequestBody;
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

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const tId = params.todoId;
  todos = todos.filter((t) => t.id !== tId);
  res.status(200).json({ message: "Deleted Todo Successfully.", todos });
};
