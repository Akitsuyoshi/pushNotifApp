const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceModelSchema = new Schema({
  name: String,
  os: String,
  isSubscribed: Boolean,
  token: String,
  registrationDate: Date,
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});

const Device = mongoose.model('Device', deviceModelSchema);

module.exports = Device;
