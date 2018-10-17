const Recipient = require('../data/recipientSchema');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const postRecipient = async (req, res) => {
  const { status, id, notificationId } = req.body;
  // NOTE: it needs to update later to deal with the case, recipient includes error message
  if (status === 'error') return;
  try {
    const newNotif = await Recipient.create([{
      status,
      expoNotifId: id,
      notification: notificationId,
    }]);
    res.json(newNotif);
  } catch (error) {
    console.log(error);
    res.send(makeErrObj(error));
  }
};

module.exports = postRecipient;
