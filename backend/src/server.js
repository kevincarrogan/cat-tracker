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

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
