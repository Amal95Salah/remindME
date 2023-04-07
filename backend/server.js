const express = require("express");
const cors = require("cors");
const mysql = require("mysql"); // middleware to enablet Cross-Origin Resource Sharing

const app = express();
const bcrypt = require("bcrypt"); // hash the password
const jwt = require("jsonwebtoken"); //create token

const port = 5000;

//connect with database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "letmein",
  database: "my_database",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/api/signup", (req, res) => {
  console.log(req.body);
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.query(
    "INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)",
    [email, hashedPassword, firstName, lastName],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "User created" });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const hashedPassword = results[0].password;
      const passwordMatch = bcrypt.compareSync(password, hashedPassword);
      if (passwordMatch) {
        const token = jwt.sign({ email }, "secret");
        res.json({ token });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  });
});

app.get("/api/data", verifyToken, (req, res) => {
  const sql = "SELECT * FROM my_table";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/api/signout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signed out successfully" });
});

function verifyToken(req, res, next) {
  // Get token from header, cookie, or query parameter
  const token = req.headers.authorization;
  //|| req.cookies.token || req.query.token;

  if (!token) {
    // If token is missing, return error
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "secret");

    // Attach the decoded token to the request object
    req.token = decoded;

    // Call the next middleware
    next();
  } catch (err) {
    // If token is invalid, return error
    return res.status(401).json({ message: "Authorization token is invalid" });
  }
}
