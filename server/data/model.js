const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceModelSchema = new Schema({
    name: String,
    os: String,
    isSubscribed: Boolean,
    token: String,
    registrationDate: Date,
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});

const Device = mongoose.model('Device', deviceModelSchema);

const pushNotificationModelSchema = new Schema({
    device: { type: Schema.Types.ObjectId, ref: 'Device' },
    isSent: Boolean,
    isOpened: Boolean,
    sentDate: Date,
});

pushNotificationModelSchema.statics.findByDeviceName =  (deviceName, callback) => {
    const query = this.findOne();
  
    Device.findOne({'name': deviceName}, (error, device) => {
      query.where(
        { device: device._id }
      ).exec(callback);
    })

    return query;
  }

const Notification = mongoose.model('Notification', pushNotificationModelSchema);

module.exports = { Device, Notification };