const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors({
    origin: "https://bioquill.netlify.app",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// ✅ Database connection

const db = mysql.createPool({
    host: 'tramway.proxy.rlwy.net',
    user: 'root',
    password: 'qnzQcMUlmHCKlvSAwtgKtpHblXabwuvi', 
    database: 'railway',
    port: 16062,
    waitForConnections: true,
    connectionLimit: 10
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
app.post('/products', (req, res) => {
    const { name, price, stock, description } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).send("All fields required");
    }

    db.query(
        "INSERT INTO Products (name, price, stock, description) VALUES (?, ?, ?, ?)",
        [name, price, stock, description],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error adding product");
            }
            res.send("Product added successfully ✅");
        }
    );
});

app.get('/', (req, res) => {
    res.send("🚀 Backend is LIVE");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});