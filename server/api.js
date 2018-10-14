
const express = require('express');
const { Expo } = require('expo-server-sdk');

const db = require('./data/index');
const { Device } = require('./data/model');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

module.exports = (app, io) => {
  io.on('connection', (socket) => {
		console.log("Client Connected");
		socket.emit('update', { message: 'Hello Client',update: false });

  	socket.on('update', (msg) => {
    	console.log(msg);
    });
  });
  
  app.get('/api/users', (req, res) => {
    const errMsg = 'No users subscribed yet, sorry!';
  
    // It fetches only subscirbers
    Device.find({'isSubscribed': true}, (err, users) => {
      if (err) return res.status(400).send(makeErrObj(err));
      if (users.length === 0) return res.status(200).send(makeErrObj(errMsg));
    }).then((device) => {
      return res.status(200).json(device);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  app.put('/api/user', (req, res) => {
    const { deviceName, os, isSubscribed, token } = req.body;

    // It first seach device by deviceName, and then if it exists on db
    // updates the isSubscribed column.
    // If not, it creates a new device with the given data
    return Device.findOneAndUpdate({name: deviceName}, { $set: { isSubscribed } }, { new: true }, (err, device) => {
      if (err) return res.send(makeErrObj(err));
      if (!device) {
        return Device.create([{
          name: deviceName,
          os,
          isSubscribed,
          token,
          registrationDate: Date.now(),
        }]).then((device) => {
          return res.json(device);
        }).catch((err) => {
          console.log(err);
        });
      }
    }).then((device) => {
      return res.json(device);
    }).catch((err) => {
      console.log(err);
    });
  });

  app.post('/api/send',(req, res) => {
    const expo = new Expo();
    console.log(expo);
    const { title, message, token }  = req.body;

    // It checks the validation of passed token
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      return;
    }
    const messages = [{
      to: token,
      sound: 'default',
      body: title,
      data: { body: message },
    }];

    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunks[0]);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
      } catch (error) {
        console.error(error);
      }
    })();

    const receiptIds = [];
    for (let ticket of tickets) {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (let chunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts);
        
          // The receipts specify whether Apple or Google successfully received the
          // notification and information about an error, if one occurred.
          for (let receipt of receipts) {
            if (receipt.status === 'ok') {
              continue;
            } else if (receipt.status === 'error') {
              console.error(`There was an error sending a notification: ${receipt.message}`);
              if (receipt.details && receipt.details.error) {
                // The error codes are listed in the Expo documentation:
                // https://docs.expo.io/versions/latest/guides/push-notifications#response-format 
                // You must handle the errors appropriately.
                console.error(`The error code is ${receipt.details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
    return res.json({ status: 'ok' });
  });
};