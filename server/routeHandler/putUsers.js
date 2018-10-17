const Device = require('../data/deviceSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const putUser = async (req, res) => {
  const {
    deviceName, os, isSubscribed, token,
  } = req.body;
  try {
    const device = await Device.findOneAndUpdate(
      { name: deviceName }, { $set: { isSubscribed } }, { new: true }, null,
    );
    if (!device) {
      const newDevice = await Device.create([{
        name: deviceName,
        os,
        isSubscribed,
        token,
        registrationDate: Date.now(),
      }]);
      return res.json(newDevice);
    }
    return res.json(device);
  } catch (err) {
    console.log(err);
    return res.status(400).send(makeErrObj(err));
  }
};
module.exports = putUser;
