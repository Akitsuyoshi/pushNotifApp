
const express = require('express');
const router = express.Router();

const db = require('./data/index');
const { Device } = require('./data/model');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

router.get('/users', (req, res) => {
  const errMsg = 'No users subscribed yet, sorry!';
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

router.post('/validate', (req, res) => {
  const errMsg = 'payload should contain address and signature';
  try {
    return res.status(200).json("hyuu");
  } catch (err) {
    console.log(err);
    return res.status(200).json({ msg: err.message });
  }
});

module.exports = router;