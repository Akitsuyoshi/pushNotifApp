const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const api = require('./server/api');
const app = express();
const port = process.env.PORT || 8001;


if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    // Replace the dead worker,
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
  // Code to run if we're in a worker process
} else {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    res.set({
      'content-type': 'application/json; charset=utf-8', 'Content-Length': '238', Connection: 'close', 'Cache-Control': 'no-cache',
    });
    
    next();
  });
  app.use(morgan('dev'));
  app.use('/api', bodyParser.urlencoded({ extended: false }), bodyParser.json());

  const listen = app.listen(port, () => console.log(`Listening on port ${port}`));
  const socket = io.listen(listen);

  api(app, socket);

  // routes in express are first come first served
  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, './client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', 'index.html')));
  }
  module.exports = app;
}


