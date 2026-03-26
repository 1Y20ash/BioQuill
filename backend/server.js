const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash@3106',
    database: 'BioQuillDB'
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("Database Connected ✅");
    }
});

// ✅ Routes
app.get('/products', (req, res) => {
    db.query("SELECT * FROM Products", (err, result) => {
        if (err) res.send(err);
        else res.json(result);
    });
});

// ✅ Server
const PORT = process.env.PORT || 3000;




app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const bcrypt = require('bcrypt'); // ensure inside or top
        console.log("BODY:", req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.log("DB ERROR:", err);   // 👈 VERY IMPORTANT
                    return res.send(err.message);    // 👈 show real error
                }
                res.send("Signup successful ✅");
            }
        );

    } catch (err) {
        console.log("CATCH ERROR:", err);
        res.send(err.message);
    }
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM Users WHERE email = ?",
        [email],
        async (err, result) => {
            if (err) {
                return res.json({ success: false, message: "Server error" });
            }

            if (result.length === 0) {
                return res.json({ success: false, message: "User not found" });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.json({
                    success: true,
                    message: "Login successful ✅",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            } else {
                res.json({ success: false, message: "Invalid password" });
            }
        }
    );
});

app.get('/', (req, res) => {
    res.send("🚀 Backend is LIVE");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});