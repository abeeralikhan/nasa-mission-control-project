const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();

const planetsRouter = require('./routes/planets/planets.route');

app.use(cors({
    origin: 'http://localhost:3000'
})); // middleware for cross-origin-policy
app.use(morgan('combined')); // middleware for managing logs

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;