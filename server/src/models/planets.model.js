const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

// to filter records
function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
// Reading data from csv file
// readable.pipe(writeable)
/*
const promise = new Promise((resolve, reject) => {
    resolve(42);
});

promise.then((result) => {

});
const result = await promise;
*/

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#', // signifies that the comments are declared using the pound symbol in the csv file
            columns: true, // signifies that the data should be javascript object instead of an array 
        }))
        .on('data', (data) => {
            if (isHabitable(data)) habitablePlanets.push(data);
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        })
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    getAllPlanets,
    loadPlanetsData
}