// Backend: server.js (Express + JSON File Database)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

const DATA_FILE = 'data.json';
// Get All Services
app.get('/services', (req, res) => {
    const data = loadData(); // Load data dari fail JSON
    res.json(data.services); // Hantar data JSON
});


// Load Data from JSON
const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) return { services: [], orders: [] };
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save Data to JSON
const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Get All Services
app.get('/services', (req, res) => {
    const data = loadData();
    res.json(data.services);
});

// Add New Service
app.post('/services', (req, res) => {
    const data = loadData();
    const newService = { id: Date.now(), ...req.body };
    data.services.push(newService);
    saveData(data);
    res.json(newService);
});

// Add Order
app.post('/orders', (req, res) => {
    const data = loadData();
    const newOrder = { id: Date.now(), ...req.body, status: 'pending' };
    data.orders.push(newOrder);
    saveData(data);
    res.json(newOrder);
});

// Get All Orders
app.get('/orders', (req, res) => {
    const data = loadData();
    res.json(data.orders);
});

app.listen(5000, () => console.log('Server running on port 5000'));