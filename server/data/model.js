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

const pushNotificationModelSchema = new Schema({
    device: { type: Schema.Types.ObjectId, ref: 'Device' },
    isSent: Boolean,
    isOpened: Boolean,
    sentDate: Date,
});

const Device = mongoose.model('Device', deviceModelSchema);
const Notification = mongoose.model('Notification', deviceModelSchema);

module.exports = { Device, Notification };