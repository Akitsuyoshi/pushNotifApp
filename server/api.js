const express = require('express');
const { Expo } = require('expo-server-sdk');

// It starts the connection between server and db
const db = require('./data/index');

// Here is each endpoint router
const getUsers = require('./routeHandler/getUsers');
const putUser = require('./routeHandler/putUsers');
const postNotification = require('./routeHandler/postNotification');
const putNotification = require('./routeHandler/putNotification');
const postSend = require('./routeHandler/postSend');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

module.exports = (app, io) => {
  io.on('connection', (socket) => {
		console.log("Client Connected");
		socket.emit('update', { message: 'Hello Client',update: false });

  	socket.on('update', (msg) => {
    	console.log(msg);
    });
  });
  
  // It fetches only subscirbers
  app.get('/api/users', getUsers);

  // It first seach device by deviceName, and then if it exists on db
  // updates the isSubscribed column.
  // If not, it creates a new device with the given data
  app.put('/api/user', putUser);

  // It creates new post, mainly used from server-side
  app.post('/api/notification', postNotification);


  // It updates the notification with payload, isOpened
  app.put('/api/notification', putNotification);

  // It sends the notification to subscribers
  app.post('/api/send', postSend);
};