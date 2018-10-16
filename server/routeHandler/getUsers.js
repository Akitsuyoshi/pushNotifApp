const Device = require('../data/deviceSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const getUsers = async (req, res) => {
  const errMsg = 'No users subscribed yet, sorry!';

  try {
    const subscribers = await Device.find({ isSubscribed: true });
    if (subscribers.length === 0) return res.status(200).send(makeErrObj(errMsg));

    return res.status(200).json(subscribers);
  } catch (err) {
    console.log(err);
    return res.status(400).send(makeErrObj(err));
  }
};

module.exports = getUsers;
