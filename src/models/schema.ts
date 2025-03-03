import {Schema, model, Document} from 'mongoose';

interface ITodo extends Document{
    name: string;
    quantity: number;
};

const todoSchema: Schema = new Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true}
}, {timestamps: true}); // Enables `createdAt` and `updatedAt`

// Create and export the Mongoose model
export default model<ITodo>('todo', todoSchema);
