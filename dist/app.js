"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = __importDefault(require("./routes/todos"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(todos_1.default);
mongoose_1.default.connect("mongodb://127.0.0.1:27017/Sample").then(result => {
    app.listen(3000, () => {
        console.log("Mongo Connected!");
        console.log("server start on port 3000");
    });
}).catch(err => {
    console.log("MongoDb Error", err);
});
