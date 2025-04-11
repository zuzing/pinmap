const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const locations = [
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
    { id: 3, name: 'Location 3' },
    { id: 4, name: 'Location 4' },
    { id: 5, name: 'Location 5' },
    { id: 6, name: 'Location 6' },
    { id: 7, name: 'Location 7' },
    { id: 8, name: 'Location 8' },
    { id: 9, name: 'Location 9' },
    { id: 10, name: 'Location 10' },
    { id: 11, name: 'Location 11' },
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/locations', (req, res) => {
    const { page = 1, limit = locations.length } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedLocations = locations.slice(startIndex, endIndex);

    res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginatedLocations,
    });
});

app.get('/pins', (req, res) => {
    const { neLat, neLng, swLat, swLng } = req.query;

    const pins = [
        { id: 1, lat: 50.0625, lng: 19.9393 },
        { id: 2, lat: 50.0630, lng: 19.9400 },
        { id: 3, lat: 50.0640, lng: 19.9410 },
    ];

    res.json(pins);
});

app.get('/pin/:id', (req, res) => {
    res.send(`Hello Pin ${req.params.id}`);
});

app.put('/pin', (req, res) => {
    const { lat, lng } = req.body;

});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});