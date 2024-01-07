import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet";
import MapPin from "../../assets/icons/map-pin.svg";

const MapView = () => {
  const position = [-12.0910215, -77.0472762];

  const markers = [
    {
      geocode: [-12.0910215, -77.0472762],
      popUp: "I'm a marker"
    }
  ]
  
  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [30, 30]
  })

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-[420px] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWx2YXJvcmRldiIsImEiOiJjbG9vdGF3am8wMnhqMmxrNmJzcnNjMTBnIn0.z1Mm4YG4WZOacxyNh_jLoA"
        maxZoom={18}
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
      />

      {markers.map(marker => (
        <Marker key={marker.popUp} position={marker.geocode} icon={customIcon}></Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
