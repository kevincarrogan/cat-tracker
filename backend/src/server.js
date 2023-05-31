import tractive from 'tractive';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const getPets = async () => {
  let pets = await tractive.getPets();
  return JSON.parse(pets);
};

const getPetLocation = async (petID) => {
  const pet = await tractive.getPet(petID);
  const {device_id, details: {name}} = pet;
  const {latlong} = await tractive.getTrackerLocation(device_id);

  return [name, latlong];
};

const getLocations = async () => {
  const pets = await getPets();
  const locations = [];
  for (const {_id: petID} of pets) {
    const [name, latlong] = await getPetLocation(petID);
    locations.push({name, latlong});
  }
  return locations;
};

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Transfer-Encoding', 'chunked');

  setInterval(async () => {
    const locations = await getLocations();
    res.write(`data: ${JSON.stringify(locations)}\n\n`);
  }, 5000);
});

const connected = await tractive.connect(process.env.TRACTIVE_ACCOUNT_EMAIL, process.env.TRACTIVE_ACCOUNT_PASSWORD);
if (!connected) {
  throw "Could not connect to tractive";
}
console.log(`Connected to tractive`);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
