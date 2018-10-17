const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipientModelSchema = new Schema({
  status: String,
  expoNotifId: String,
  notification: { type: Schema.Types.ObjectId, ref: 'Notification' },
});

const Recipient = mongoose.model('Recipient', recipientModelSchema);

module.exports = Recipient;
