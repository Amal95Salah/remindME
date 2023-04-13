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
    "INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = email",
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
        const id = results[0].id;

        const token = jwt.sign({ id }, "secret");
        res.json({ token: token });
      } else {
        console.log("notuth");

        res.status(401).json({ message: "Unauthorized" });
      }
    }
  });
});

app.get("/api/user/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("no user", id);
      return res.status(404).json({ message: "User not found" });
    } else {
      const user = result[0];
      return res.json(user);
    }
  });
});

app.get("/api/data", verifyToken, (req, res) => {
  console.log("data");
  const sql = "SELECT * FROM my_table";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});
app.get("/api/medicine/:user_id", verifyToken, (req, res) => {
  const { user_id } = req.params;
  const pageSize = 6; // Set the number of items per page
  const sql =
    "SELECT * FROM user_medicine JOIN medicine ON user_medicine.medicine_id = medicine.id WHERE user_medicine.user_id = ? LIMIT ?";
  db.query(sql, [user_id, pageSize], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/api/profile", verifyToken, (req, res) => {
  const sql = "SELECT * FROM use";
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
  // console.log("yes", req, res, next);
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

app.post("/api/medicine/:user_id", verifyToken, (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  const { user_id } = req.params;
  db.query(
    "INSERT INTO medicine (name ) VALUES (?) ON DUPLICATE KEY UPDATE name = name",
    [name],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "medicine is added to medicine" });
      const medicine_id = results.insertId;
      insertMedicineUser(user_id, medicine_id);
    }
  );
});
function insertMedicineUser(user_id, medicine_id) {
  db.query(
    "INSERT INTO user_medicine (user_id, medicine_id) VALUES (?, ?)",
    [user_id, medicine_id],
    (error, resultss) => {
      if (error) throw error;
    }
  );
}

app.post("/api/reminder/add", verifyToken, (req, res) => {
  console.log(req.body);

  const {
    user_id,
    medicine,
    dosage,
    repetition,
    frequency,
    startDate,
    endDate,
    time,
    note,
  } = req.body;
  db.query(
    "INSERT INTO reminder (user_id, medicine, dosage, repetition, frequency, startDate, endDate, time, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user_id,
      medicine,
      dosage,
      repetition,
      frequency,
      startDate,
      endDate,
      time,
      note,
    ],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "reminder is added" });
    }
  );
});

app.put("/api/users/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, password, newEmail } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "UPDATE users SET firstName = ?, lastName = ?, password = ?, email = ? WHERE id = ?",
    [firstName, lastName, hashedPassword, newEmail, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

app.get("/api/notification/count/:userId", (req, res) => {
  const { userId } = req.params;

  // Execute a MySQL query to count the number of unread notifications for the user
  db.query(
    "SELECT COUNT(*) as count FROM notification WHERE user_id = ? AND isRead = FALSE",
    [userId],
    (error, results) => {
      if (error) throw error;
      const count = results[0].count;
      res.json({ count });
    }
  );
});

app.get("/api/notification/:userId", (req, res) => {
  const { userId } = req.params;

  // Execute a MySQL query to count the number of unread notifications for the user
  db.query(
    "SELECT * FROM notification WHERE user_id = ? AND isRead = FALSE",
    [userId],
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
app.put("/api/notification/read/:notificationId/", (req, res) => {
  const { notificationId } = req.params;

  // Execute a MySQL query to update the notification's isRead flag
  db.query(
    "UPDATE notification SET isRead = TRUE WHERE id = ?",
    [notificationId],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "Notification updated" });
    }
  );
});
// /api/notification
