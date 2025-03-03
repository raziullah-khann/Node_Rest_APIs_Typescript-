"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const todoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true }); // Enables `createdAt` and `updatedAt`
// Create and export the Mongoose model
exports.default = (0, mongoose_1.model)('todo', todoSchema);
