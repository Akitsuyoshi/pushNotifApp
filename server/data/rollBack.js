const Device = require('./data/deviceSchema');
const Notification = require('./data/notificationSchema');

Device.collection.drop();
Notification.collection.drop();