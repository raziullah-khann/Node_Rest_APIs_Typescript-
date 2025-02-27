import {Router} from 'express';
import { Todo } from '../models/todo';
const todos: Todo[] = [];

const router = Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({todos: todos})
});

router.post('/add-todo', (req,res,next)=>{
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    };

    todos.push(newTodo);

    res.status(200).json({message: 'Todo Added!', todo: newTodo});
})

export default router;