const fetch = require('node-fetch');

const makeErrObj = msg => ({
  status: 'error',
  msg,
});

const sendtoAll = async (req, res) => {
  try {
    const { title, message, tokens } = req.body;
    console.log(tokens);

    // NOTE: it needs to update when its development.
    const result = Promise.all(tokens.map(token => fetch('http://localhost:8001/api/send', {
      method: 'POST',
      body: JSON.stringify({ title, message, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    })));

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(makeErrObj(error));
  }
};

module.exports = sendtoAll;
