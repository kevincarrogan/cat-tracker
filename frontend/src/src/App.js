import { useEffect, useState } from "react";

import Cat from "./Cat";

const App = () => {
  const [cats, setCats] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_CATS_DETAILS_URL)
      .then((response) => response.json())
      .then((response) => setCats(response));
  }, []);

  useEffect(() => {
    if (!cats.length) {
      return;
    }

    const evtSource = new EventSource(process.env.REACT_APP_CATS_LOCATION_URL);
    evtSource.addEventListener("message", (payload) => {
      const locations = JSON.parse(payload.data);
      setLocations(locations);
    });
  }, [cats]);

  return (
    <div>
      {locations.map(({ name, latlong }) => {
        return <Cat key={name} name={name} latlong={latlong} />;
      })}
    </div>
  );
};

export default App;
