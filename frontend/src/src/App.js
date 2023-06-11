import { useEffect, useState } from "react";

import Cat from "./Cat";


const App = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const evtSource = new EventSource("http://localhost:3010/sse");
    evtSource.addEventListener("message", (payload) => {
      const locations = JSON.parse(payload.data)
      setLocations(locations);
    });
  }, []);
  return (<div>{
    locations.map(({name, latlong}) => <Cat name={name} latlong={latlong} />)
  }</div>);
};

export default App;
