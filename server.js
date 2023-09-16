const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()
const{
    getTodos,
    getTodoByName,
    createTodo,
    updateTodo,
    deleteTodo,

    
} = require('./contorllers/todoController')

//App config
const app = express();

const port = process.env.PORT || 8080

const connectionURL = process.env.MONGO_URL

// Middlewares
//convert to json

app.use(express.json())

app.use(cors())



// DB Confing

mongoose.connect(connectionURL)
.then(() => {
    app.listen(port, () => console.log(`Running on port: ${port}`))
})
.catch((err) => {
    console.log(err);
});

// API Endpoint

app.get('/todos', getTodos)

app.get('/todo/', getTodoByName);

app.post('/todos', createTodo)

app.patch('/todos/:id', updateTodo)


app.delete('/todos/:id', deleteTodo)