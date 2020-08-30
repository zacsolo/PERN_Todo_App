const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//--Middleware--
app.use(cors());
app.use(express.json());

//--Routes--

//----Create a todo--
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});
//----Get all todos--
//----Get a todo--
//----Update a todo--
//----Delete a todo--

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
