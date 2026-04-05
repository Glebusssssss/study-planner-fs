const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.json());

// 1. Database Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', 
    database: 'study_planner'
});

db.connect(err => {
    if (err) {
        console.error('❌ DATABASE ERROR:', err.message);
    } else {
        console.log('✅ DATABASE CONNECTED SUCCESSFULLY!');
    }
});

// 2. API ROUTES (Must be above the static files)
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, subject } = req.body;
    db.query('INSERT INTO tasks (title, subject) VALUES (?, ?)', [title, subject], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title, subject });
    });
});

// 3. Serve Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

// 4. Start Server
app.listen(3000, () => {
    console.log('🚀 SERVER IS LIVE AT http://localhost:3000');
});