const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const port = 5000;
const app = express();

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

////// AUTHENTICATION //////

app.post("/api/signup", (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = email",
    [email, hashedPassword, firstName, lastName],
    (error) => {
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
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  });
});

app.post("/api/signout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signed out successfully" });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, "secret");

    req.token = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Authorization token is invalid" });
  }
}

////// USER ENDPOINTS //////

app.get("/api/user/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const user = result[0];
      return res.json(user);
    }
  });
});

app.get("/api/profile", verifyToken, (req, res) => {
  const sql = "SELECT * FROM use";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
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

////// MEDICINE ENDPOINTS //////

app.get("/api/medicine/:user_id", verifyToken, (req, res) => {
  const { user_id } = req.params;

  const sql =
    "SELECT * FROM user_medicine JOIN medicine ON user_medicine.medicine_id = medicine.id WHERE user_medicine.user_id = ? ";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

function insertMedicineUser(user_id, medicine_id) {
  db.query(
    "INSERT INTO user_medicine (user_id, medicine_id) VALUES (?, ?)",
    [user_id, medicine_id],
    (error) => {
      if (error) throw error;
    }
  );
}

app.post("/api/medicine/:user_id", verifyToken, (req, res) => {
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

app.delete("/api/medicine/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM user_medicine WHERE medicine_id = ?", [id], (error) => {
    if (error) throw error;
    console.log("deleted medicine from user_medicine");
  });

  db.query("DELETE FROM medicine WHERE id = ?", [id], (error) => {
    if (error) throw error;
    res.json({ message: "medicine is deleted" });
    console.log("deleted medicine");
  });
});

////// REMINDER ENDPOINTS //////

app.get("/api/reminder/:user_id", verifyToken, (req, res) => {
  const { user_id } = req.params;

  const sql = "SELECT * FROM reminder  WHERE user_id = ? ";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/api/reminder/add", verifyToken, (req, res) => {
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
      const id = results.insertId;

      res.json({ message: "reminder is added", id });
    }
  );
});

app.delete("/api/reminder/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM reminder WHERE id = ?", [id], (error) => {
    if (error) throw error;
    res.json({ message: "reminder is deleted" });
    console.log("deleted reminder");
  });
});

////// NOTIFICATION ENDPOINTS //////

app.get("/api/notification/count/:userId", (req, res) => {
  const { userId } = req.params;

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

  db.query(
    "SELECT * FROM notification WHERE user_id = ? AND isRead = FALSE ORDER BY id DESC",
    [userId],
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/api/notification/all/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM notification WHERE user_id = ? ORDER BY id DESC",
    [userId],
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.put("/api/notification/read/:notificationId/", (req, res) => {
  const { notificationId } = req.params;

  db.query(
    "UPDATE notification SET isRead = TRUE WHERE id = ?",
    [notificationId],
    (error) => {
      if (error) throw error;
      res.json({ message: "Notification updated" });
    }
  );
});

app.post("/api/notification/add", verifyToken, (req, res) => {
  const { reminder_id, message, isRead, user_id } = req.body;

  db.query(
    "INSERT INTO notification (reminder_id,message,isRead,user_id ) VALUES (?,?,?,?)",
    [reminder_id, message, isRead, user_id],
    (error) => {
      if (error) throw error;
      res.json({ message: "notification is added" });
    }
  );
});

app.delete(
  "/api/notification/reminder/:reminder_id",
  verifyToken,
  (req, res) => {
    const { reminder_id } = req.params;

    db.query(
      "DELETE FROM notification WHERE reminder_id = ?",
      [reminder_id],
      (error) => {
        if (error) throw error;
        res.json({ message: "notification is deleted" });
        console.log("deleted notification");
      }
    );
  }
);
