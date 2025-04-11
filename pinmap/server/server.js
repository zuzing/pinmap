const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const Pin = require('./pinSchema');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DATABASE_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection.useDb('pinmap');


app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.get('/pins', async (req, res) => {
    try {
        const pins = await Pin.find({});
        res.json(pins);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching pins');
    }
});

app.get('/pin/:id', async (req, res) => {
    try {
        const pin = await Pin.findById(req.params.id);
        if (!pin) {
            return res.status(404).send('Pin not found');
        }
        res.json(pin);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching pin');
    }
});

app.post('/pin', async (req, res) => {
    try {
        const { name, loc } = req.body;
        const newPin = new Pin({ name, loc });
        const savedPin = await newPin.save();
        res.json(savedPin);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving pin');
    }
});

app.put('/pin/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const updatedPin = await Pin.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedPin) {
            return res.status(404).send('Pin not found');
        }
        res.json(updatedPin);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating pin');
    }
});

app.delete('/pin/:id', async (req, res) => {
    try {
        const deletedPin = await Pin.findByIdAndDelete(req.params.id);
        if (!deletedPin) {
            return res.status(404).send('Pin not found');
        }
        res.json(deletedPin);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting pin');
    }
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});