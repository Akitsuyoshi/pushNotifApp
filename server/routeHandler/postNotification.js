const Device = require('../data/deviceSchema');
const Notification = require('../data/notificationSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const postNotification = async (req, res) => {
  const { token } = req.body;
  if (!token) return;
  try {
    const device = await Device.findOne({ token });

    const id = device._id;
    const newNotif = await Notification.create([{
      device: id,
      isSent: true,
      isOpened: false,
      sentDate: Date.now(),
    }]);
    res.json(newNotif);
  } catch (error) {
    console.log(error);
    res.send(makeErrObj(error));
  }
};

module.exports = postNotification;
