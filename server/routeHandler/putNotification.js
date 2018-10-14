const Device = require('../data/deviceSchema');
const Notification = require('../data/notificationSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const putNotification =  async (req, res) => {
  const { deviceName, isOpened } = req.body;
  try {
    const device = await Device.find({ "name": deviceName });
    const id = device._id;

    const updatedNotification =  await Notification.findOneAndUpdate({ name: device._id }, { $set: { isOpened } }, { new: true }, null);
    return res.json(updatedNotification);
  } catch (error) {
    console.log(error);
    return res.send(makeErrObj(error));
  }
};

module.exports = putNotification;