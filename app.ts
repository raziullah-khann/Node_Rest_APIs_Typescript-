import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todos';

const app = express();

app.use(todoRoutes);    

app.listen(3000, () =>{
    console.log("server start on port 3000");
});