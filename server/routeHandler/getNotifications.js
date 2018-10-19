const Notification = require('../data/notificationSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const getNotifications = async (req, res) => {
  const errMsg = 'No notifications yet, sorry!';

  try {
    const notifications = await Notification.find();
    if (notifications.length === 0) return res.status(200).send(makeErrObj(errMsg));

    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(400).send(makeErrObj(err));
  }
};

module.exports = getNotifications;
