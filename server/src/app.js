const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const planetsRouter = require('./routes/planets/planets.route');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;