const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        require: true,
    },
    rocket: {
        type: String,
        required: true
    },
    // following is a foreign key type object that refers to the planets model
    target: {
        type: String,
        required: true,
        // type: mongoose.ObjectId,
        // ref: 'Planet',
    },
    // customers is an array of string
    customers: [ String ],
    upcomming: {
        type: Boolean,
        require: true,
    },
    success: {
        type: Boolean,
        require: true,
        default: true,
    },
});

// making model from the schema
// Connects launchesSchema with the "launches" collecton
// compiling the model ^
module.exports = mongoose.model('Launch', launchesSchema);
