const express = require('express');
const cors = require('cors');
const mysql = require('mysql'); // middleware to enablet Cross-Origin Resource Sharing

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'letmein',
  database: 'my_database',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM my_table';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
	
    res.send(result);
  });
});