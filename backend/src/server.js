const express = require('express');
const app = express();

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Transfer-Encoding', 'chunked');

  setInterval(() => {
    const data = { message: 'Hello, client!' };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
