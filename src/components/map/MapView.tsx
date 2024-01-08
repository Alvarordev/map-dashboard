import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import MapPin from "../../assets/icons/map-pin.svg";

import 'leaflet/dist/leaflet.css'
import { fetchMarkers } from "./markers";
import { useEffect, useState } from "react";

interface Marker {
  geocode: [number, number]
}

const MapView = () => {
  const position: [number, number] = [-12.0910215, -77.0472762];
  const [markers, setMarkers] = useState<Marker[]>([])

  useEffect(() => {
    const getMarkers = async () => {
      const response = await fetchMarkers()
      setMarkers(response)
    }

    getMarkers()
  }, [])

  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  })

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-[420px] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        maxZoom={18}
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={customIcon}></Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
