import mongoose from 'mongoose';
import Todo from '../models/todos.js';

export const readTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}
export const createTodo = async (req, res) => {
    console.log("body",req.body);
    const todo = new Todo(req.body);
    try {
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, content, contentType } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} is not valid`);
    }
    const todo = { title, content,contentType, _id: id };
    await Todo.findByIdAndUpdate(id, todo, { new: true })
    res.json(todo);
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} is not valid`);
    }

    try {
        // Find the todo by ID and delete it
        const deletedTodo = await Todo.findByIdAndDelete(id);

        // Check if the todo was found and deleted successfully
        if (!deletedTodo) {
            return res.status(404).send(`Todo with id ${id} not found`);
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        // Handle any errors that occurred during the deletion process
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};