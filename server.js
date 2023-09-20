const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routers/user');
const todoRoutes = require('./routers/todo'); 
const requireAuth = require('./middleware/requireAuth');


dotenv.config();

//App config
const app = express();

const port = process.env.PORT || 8080

const connectionURL = process.env.MONGO_URL

app.use(cors());
// Middlewares



//convert to json

app.use(express.json());



//routes
app.use('/api/todos', requireAuth, todoRoutes);
app.use('/api/user', userRoutes);

// DB Confing

mongoose.connect(connectionURL)
.then(() => {
    app.listen(port, () => console.log(`Running on port: ${port}`))
})
.catch((err) => {
    console.log(err);
});

