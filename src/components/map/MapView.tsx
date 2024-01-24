import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, Map } from "leaflet";
import RedPin from "../../assets/icons/map-pin.svg";
import GreenPin from "../../assets/icons/map-pin-green.svg";
import { Button } from "../ui/Button";
import { type Marker as MarkerType, fetchMarkers } from "./markers";
import { useCallback, useEffect, useMemo, useState } from "react";

import "leaflet/dist/leaflet.css";


const redPin = new Icon({
  iconUrl: RedPin,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const greenPin = new Icon({
  iconUrl: GreenPin,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

interface Props {
  onMapChange: React.Dispatch<React.SetStateAction<Map | null>>;
  multas: Multa[]
}

const MapView = ({ onMapChange, multas }: Props) => {
  const position: geoCode = [-12.0910215, -77.0472762];
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    fetchMarkersAndSetState();
  }, [multas]);

  useEffect(() => {
    updateMap();
  }, [markers]);

  const updateMap = () => {
    onMapChange(map);
  };

  const fetchMarkersAndSetState = async () => {
    const response = await fetchMarkers(multas);
    setMarkers(response);
  };

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
            icon={marker.estado ? redPin : greenPin}
          >
            <Popup>
              <ul className="flex flex-col">
                <li>Multa: {marker.id}</li>
                <li>Tipo: {marker.tipo === 1 ? 'Liviano' : 'Pesado'}</li>
                <li>Dirección: {marker.direccion}</li>
                <li>
                  Estado del cepo: {marker.estado ? "Bloqueado" : "Liberado"}
                </li>
                <li>
                  Estado del pago: {marker.estadoPago ? "Pagado" : "Pendiente"}
                </li>
              </ul>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [markers]
  );

  return (
    <div className="relative">
      {displayMap}
      {map ? <CenterMapButon map={map} /> : null}
    </div>
  );
};

export default MapView;


const CenterMapButon = ({ map }: { map: Map }) => {
  const onClick = useCallback(() => {
    map.setView([-12.0910215, -77.0472762], 13);
  }, [map]);

  return (
    <Button
      size="sm"
      className="mt-2 absolute top-0 z-[1000] right-2"
      onClick={onClick}
    >
      Reiniciar Mapa
    </Button>
  );
};