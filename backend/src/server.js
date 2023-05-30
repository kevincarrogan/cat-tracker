const tractive = require('tractive');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Transfer-Encoding', 'chunked');

  let count = 0;

  setInterval(() => {
    const data = { message: `Hello, ${count++}!` };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
});

tractive.connect(process.env.TRACTIVE_ACCOUNT_EMAIL, process.env.TRACTIVE_ACCOUNT_PASSWORD)
  .then(connected => {
    console.log(`Connected to tractive: ${connected}`);
    if (!connected) {
      throw "Could not connect to tractive";
    }
  })
  .then(() => {
    // Start the server
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  });
