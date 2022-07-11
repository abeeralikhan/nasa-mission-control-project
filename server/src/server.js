const app = require('./app');
const mongoose = require('mongoose');

const http = require('http');

const { loadPlanetsData } = require('./models/planets.model');

// process.env --> returns user enviroment
const PORT = process.env.PORT || 8000;

// we're creating a server using express as a middleware
const server = http.createServer(app);

const MONGO_URL = 'mongodb://nasa-api:LrfSm8iPvdvA4JlZ@nasaproject-shard-00-00.l4dkl.mongodb.net:27017,nasaproject-shard-00-01.l4dkl.mongodb.net:27017,nasaproject-shard-00-02.l4dkl.mongodb.net:27017/nasa?ssl=true&replicaSet=atlas-v43hzg-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDB server is connected!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});
// We're using a aync function here because without it, we cannot use the await keyword
// Below is a very common pattern for a node app
async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    // express and http has same listening function
    server.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
}

startServer();



