const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Connect to the database
const db = new sqlite3.Database('customer_database.db');

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to search for customer tickets
app.post('/search', (req, res) => {
    const customerId = req.body.customerId;
    db.get('SELECT * FROM customers WHERE id = ?', [customerId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({ name: row.name, tickets: row.tickets });
        } else {
            res.status(404).json({ error: 'Customer ID not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
