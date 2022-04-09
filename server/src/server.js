const app = require('./app');

const http = require('http');

const { loadPlanetsData } = require('./models/planets.model');

// process.env --> returns user enviroment
const PORT = process.env.PORT || 8000;

// we're creating a server using express as a middleware
const server = http.createServer(app);

// We're using a aync function here because without it, we cannot use the await keyword
// Below is a very common pattern for a node app
async function startServer() {
    await loadPlanetsData();

    // express and http has same listening function
    server.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
}

startServer();



