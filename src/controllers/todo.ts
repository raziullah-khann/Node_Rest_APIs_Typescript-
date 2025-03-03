import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";
import TodoSchema from "../models/schema";

type RequestBody = { name: string; quantity: number };
type RequestParams = { todoId: string };

// Get all todos
export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await TodoSchema.find();
    res.status(200).json({ data: data });
  } catch (err) {
    next(err);
  }
};

// Add a new todo
export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: RequestBody = req.body;
  try {
    const newTodo = new TodoSchema({
      name: body.name,
      quantity: body.quantity,
    });

    await newTodo.save();

    res.status(201).json({ message: "Todo Added!", todo: newTodo });
  } catch (err) {
    next(err);
  }
};

// Update a todo
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoId } = req.params; // ✅ Destructure `todoId`
    const { name, quantity }: RequestBody = req.body;

    //Reaching out to database
    const todo = await TodoSchema.findById(todoId);

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Could not find todo for this id." });
    }
    todo.name = name;
    todo.quantity = quantity;
    await todo.save();
    return res
      .status(200)
      .json({ message: "Updated Todo Successfully.", todo: todo });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoId } = req.params;
    // Find the todo before deleting
    const todo = await TodoSchema.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    // Delete the todo
    await TodoSchema.findByIdAndDelete(todoId);
    res
      .status(200)
      .json({ message: "Deleted Todo Successfully.", deletedTodo: todo });
  } catch (error) {
    next(error);
  }
};
