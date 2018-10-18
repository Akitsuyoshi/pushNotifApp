// It starts the connection between server and db
require('./data/index');

// Here is each endpoint router
const getUsers = require('./routeHandler/getUsers');
const getNotifications = require('./routeHandler/getNotifications');
const putUser = require('./routeHandler/putUsers');
const postNotification = require('./routeHandler/postNotification');
const putNotification = require('./routeHandler/putNotification');
const postSend = require('./routeHandler/postSend');
const postRecipient = require('./routeHandler/postRecipient');
const sendtoAll = require('./routeHandler/sendtoAll');


module.exports = (app, io) => {
  // io.on('connection', (socket) => {
  //   console.log('Client Connected');

  //   socket.on('update subscriber', (subscriber) => {
  //     // once we get a 'change color' event from one of our clients,
  //     // we will send it to the rest of the clients
  //     console.log('new or update subscriber', subscriber);
  //     io.emit('update subscriber', subscriber);
  //   });

  //   // disconnect is fired when a client leaves the server
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
  // });

  // It fetches only subscirbers
  app.get('/api/users', getUsers);

  // It gets all notifications
  app.get('/api/notifications', getNotifications);

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

  // It sends the recipient from expo to db
  app.post('/api/recipient', postRecipient);

  app.post('/api/sendtoAll', sendtoAll);
};
