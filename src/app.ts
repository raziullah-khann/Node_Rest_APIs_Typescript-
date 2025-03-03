import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todos';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

app.use(todoRoutes);    

mongoose.connect("mongodb://127.0.0.1:27017/Sample").then(result => {
    app.listen(3000, () =>{
        console.log("Mongo Connected!")
        console.log("server start on port 3000");
    });
}).catch(err=>{
    console.log("MongoDb Error",err);
})