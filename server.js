const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routers/user');

dotenv.config()
const{
    getTodos,
    getTodoByID,
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

//routes
app.use('/api/user', userRoutes)

const atRouter = express.Router();
atRouter.get('/', async(req, res)=>res.send("At router"));
app.use('/api/at', atRouter);

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

app.get('/todos/:id', getTodoByID);

app.post('/todos', createTodo)

app.patch('/todos/:id', updateTodo)


app.delete('/todos/:id', deleteTodo)