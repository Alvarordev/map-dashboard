import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, Map } from "leaflet";
import MapPin from "../../assets/icons/map-pin.svg";

import "leaflet/dist/leaflet.css";
import { fetchMarkers } from "./markers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMapContext } from "../../context/map-context";
import { Button } from "../ui/Button";

interface Marker {
  geocode: geoCode;
}

const SetMapFunction = ({ map }: { map: Map }) => {
  const onClick = useCallback(() => {
    map.setView([-12.0910215, -77.0472762], 13);
  }, [map]);

  return <Button size="sm" className="mt-2 absolute top-0 z-[1000] right-2" onClick={onClick}>Reiniciar Mapa</Button>;
};

const MapView = () => {
  const position: [number, number] = [-12.0910215, -77.0472762];
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<Map | null>(null);

  const { setMap: defineMap } = useMapContext();

  useEffect(() => {
    defineMap(map);
  }, [markers]);

  useEffect(() => {
    const getMarkers = async () => {
      const response = await fetchMarkers();
      setMarkers(response);
    };

    getMarkers();
  }, []);

  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        ref={setMap}
        className="h-[420px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
          maxZoom={18}
          id="mapbox/streets-v11"
          tileSize={512}
          zoomOffset={-1}
        />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode}
            icon={customIcon}
          ></Marker>
        ))}
      </MapContainer>
    ),
    [markers]
  );

  return (
    <div className="relative">
      {displayMap}
      {map ? <SetMapFunction map={map} /> : null}
    </div>
  );
};

export default MapView;
