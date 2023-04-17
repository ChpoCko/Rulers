const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const openDb = require('./openDb');
app.use(cors());



app.get('/allcards', (req, res) => {
  const pool = openDb();


  // TEST THE FUNCTION TO ADD CARDS


  pool.query('SELECT * FROM card', (error, result) => {
    if (error) {
      res.statusMessage = 'Something went wrong with the DB. Try again later.';
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json(result.rows);
  });
});

const port = process.env.PORT || 3001;
app.listen(port);





