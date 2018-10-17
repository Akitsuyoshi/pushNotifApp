const { Expo } = require('expo-server-sdk');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const postSend = async (req, res) => {
  const expo = new Expo();
  const { title, message, token } = req.body;

  // It checks the validation of passed token
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token ${token} is not a valid Expo push token`);
  }
  const messages = [{
    to: token,
    sound: 'default',
    body: title,
    data: { body: message },
  }];
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  const receiptIds = [];

  try {
    // It is to send one chunk at a
    // time, which nicely spreads the load out over time:
    const ticketChunk = await expo.sendPushNotificationsAsync(chunks[0]);
    console.log(ticketChunk);
    tickets.push(...ticketChunk);
    // NOTE: a ticket might contain an error code in ticket.details.error

    tickets.forEach((ticket) => {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.id) receiptIds.push(ticket.id);
    });
    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

    receiptIdChunks.forEach(async (chunk) => {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        if (!receipts) return;
        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        Object.keys(receipts).forEach((receipt) => {
          if (receipt.status === 'ok') {
            console.log(receipt);
            return true;
          } if (receipt.status === 'error') {
            console.error(`There was an error sending a notification: ${receipt.message}`);
            if (receipt.details && receipt.details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
              console.error(`The error code is ${receipt.details.error}`);
              return receipt.details.error;
            }
          }
          return null;
        });
      } catch (error) {
        console.error(error);
      }
    });
    return res.json(ticketChunk[0]);
  } catch (error) {
    console.log(error);
    return res.json(makeErrObj(error));
  }
};

module.exports = postSend;
