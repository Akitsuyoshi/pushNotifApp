const Device = require('../data/deviceSchema');
const Notification = require('../data/notificationSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const putUser = async (req, res) => {
  const { deviceName, os, isSubscribed, token } = req.body;
  try {
    const device = await Device.findOneAndUpdate({name: deviceName}, { $set: { isSubscribed } }, { new: true }, null);
    if (!device) {
      const device = await Device.create([{
        name: deviceName,
        os,
        isSubscribed,
        token,
        registrationDate: Date.now(),
      }]);
      return res.json(device);
    } else {
      return res.json(device);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(makeErrObj(err));
  }
};

module.exports = putUser;