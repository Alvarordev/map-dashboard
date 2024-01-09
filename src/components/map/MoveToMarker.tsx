import { useCallback } from "react";
import { Button } from "../ui/Button";
import { Map } from "leaflet";

interface Props {
  coords: geoCode;
  map: Map | null;
}

const MoveToMarker = ({ coords, map }: Props) => {
  const setMapView = useCallback(() => {
    map?.setView(coords, 16);
  }, [map]);

  return (
    <Button variant="link" onClick={setMapView}>
      ubicar
    </Button>
  );
};

export default MoveToMarker;
