import GoogleMapReact from "google-map-react";

const Marker = ({ children }) => <div>{children}</div>;

const Cat = ({ name, latlong: [lat, lng] }) => (
  <div>
    <h1>{name}</h1>
    <div style={{ height: "500px", width: "500px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat, lng }}
        defaultZoom={16}
      >
        <Marker lat={lat} lng={lng}>
          test
        </Marker>
      </GoogleMapReact>
    </div>
  </div>
);

export default Cat;
