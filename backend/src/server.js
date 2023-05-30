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

  setInterval(async () => {
    let pets = await tractive.getPets();
    pets = JSON.parse(pets);
    const locations = [];
    for (const {_id: petId} of pets) {
      const pet = await tractive.getPet(petId);
      const {device_id, details: {name}} = pet;
      const {latlong} = await tractive.getTrackerLocation(device_id);
      locations.push({name, latlong});
    }
    res.write(`data: ${JSON.stringify(locations)}\n\n`);
  }, 5000);
});

tractive.connect(process.env.TRACTIVE_ACCOUNT_EMAIL, process.env.TRACTIVE_ACCOUNT_PASSWORD)
  .then(connected => {
    if (!connected) {
      throw "Could not connect to tractive";
    }
    console.log(`Connected to tractive`);
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  });
