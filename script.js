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
Modify Client-Side Script (script.js): Update the searchTickets function to send a request to the server.

JavaScript
// Function to search for customer tickets
async function searchTickets() {
    const customerId = document.getElementById('customerId').value.trim(); // Sanitize input
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId })
        });
        
        if (response.ok) {
            const customer = await response.json();
            resultDiv.textContent = `Customer Name: ${customer.name}, Lucky Draw Tickets: ${customer.tickets}`;
        } else if (response.status === 404) {
            resultDiv.textContent = 'Customer ID not found';
        } else {
            resultDiv.textContent = 'An error occurred';
        }
    } catch (error) {
        resultDiv.textContent = 'An error occurred';
    }
}
