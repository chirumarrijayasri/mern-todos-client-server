import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js'

const app = express();
dotenv.config()
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/todos', todosRoutes)
const db = "mongodb://localhost:27017/todo-database"

app.get('/', (req,res) => {
    console.log('welcome to server')
})

const port = process.env.PORT || 9999;

app.listen(port, () => {
    mongoose.connect(db)
        .then(() => console.log(`Server is running on port 3000 and connected to the database`))
        .catch((err) => console.log(err));
});