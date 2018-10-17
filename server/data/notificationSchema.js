const mongoose = require('mongoose');

const { Schema } = mongoose;
const Device = require('./deviceSchema');


const pushNotificationModelSchema = new Schema({
  isSent: Boolean,
  isOpened: Boolean,
  sentDate: Date,
  device: { type: Schema.Types.ObjectId, ref: 'Device' },
});

pushNotificationModelSchema.statics.findByDeviceName = function (deviceName, callback) {
  const query = this.findOne();

  Device.findOne({ name: deviceName }, (error, device) => {
    const id = device._id;
    query.where(
      { device: _id },
    ).exec(callback);
  });
  return query;
};

pushNotificationModelSchema.statics.findByDeviceToken = function (token, callback) {
  const query = this.findOne();

  Device.findOne({ token }, (error, device) => {
    const id = device._id;
    console.log(id);
    query.where(
      { device: id },
    ).exec(callback);
  });
  return query;
};

const Notification = mongoose.model('Notification', pushNotificationModelSchema);

module.exports = Notification;
