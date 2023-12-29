import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    contentType: {
        type: String, // This field will store the content type (e.g., "text", "image", "url")
        // required: true
    }
}, 
{ timestamps: true });
const Todo = mongoose.model('Todo', todoSchema)
export default Todo;