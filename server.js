const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routers/user');
const todoRoutes = require('./routers/todo');
const requireAuth = require('./middleware/requireAuth');

dotenv.config();


const app = express();
const port = process.env.PORT ;
const connectionURL = process.env.MONGO_URL;

app.use(cors());

const version = "0.1.0"
app.use(express.json());

app.use('/',(req, res) => res.send(version));
app.use('/api/todos', requireAuth, todoRoutes);
app.use('/api/user', userRoutes);


mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => console.log(`It's running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });