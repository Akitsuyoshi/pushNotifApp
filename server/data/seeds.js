const db = require('./index');

const { Device, Notification } = require('./model');

Device.collection.drop();
Notification.collection.drop();

Device.create([{
  name: 'android1',
  os: 'android',
  isSubscribed: true,
  registrationDate: Date.now(),
}, {
  name: 'ios1',
  os: 'ios',
  isSubscribed: true,
  registrationDate: Date.now(),
}, {
  name: 'android2',
  os: 'android',
  isSubscribed: false,
  registrationDate: Date.now(),
}])
.then((device) => {
  console.log(`${device}, users created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  db.close();
});