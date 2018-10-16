const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io');
const api = require('./server/api');

const app = express();
const port = process.env.PORT || 8001;

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
