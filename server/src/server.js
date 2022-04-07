const app = require('./app');
const http = require('http');

// process.env --> returns user enviroment
const PORT = process.env.PORT || 8000;

// we're creating a server using express as a middleware
const server = http.createServer(app);

// express and http has same listening function
server.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});



