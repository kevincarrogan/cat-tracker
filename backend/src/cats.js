import tractive from "tractive";

const getPets = async () => {
  let pets = await tractive.getPets();
  return JSON.parse(pets);
};

const getPetLocation = async (petID) => {
  const pet = await tractive.getPet(petID);
  const {
    device_id,
    details: { name },
  } = pet;
  const { latlong } = await tractive.getTrackerLocation(device_id);

  return [name, latlong];
};

const getLocations = async () => {
  const pets = await getPets();
  const locations = [];
  for (const { _id: petID } of pets) {
    const [name, latlong] = await getPetLocation(petID);
    locations.push({ name, latlong });
  }
  return locations;
};

const getCats = async () => {
  const cats = [];
  const pets = await getPets();
  for (const { _id: petID } of pets) {
    const pet = await tractive.getPet(petID);
    const {
      home_location: homeLocation,
      details: { name, profile_picture_link: profilePictureLink },
    } = pet;
    cats.push({
      name,
      homeLocation,
      profilePictureLink,
    });
  }
  return cats;
};

const connectToTracker = async () => {
  const connected = await tractive.connect(
    process.env.TRACTIVE_ACCOUNT_EMAIL,
    process.env.TRACTIVE_ACCOUNT_PASSWORD
  );
  if (!connected) {
    throw "Could not connect to tractive";
  }
  console.log(`Connected to tractive`);
};

export { connectToTracker, getCats, getLocations, getPets };
