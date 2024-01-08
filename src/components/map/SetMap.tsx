import { useCallback } from "react";
import { useMapContext } from "../../context/map-context";
import { Button } from "../ui/Button";

const SetMap = ({coords}: {coords: geoCode}) => {
  const { map } = useMapContext();

  const onClick = useCallback(() => {
    map?.setView(coords, 16);
  }, [map]);

  return <Button variant="link" onClick={onClick}>ubicar</Button>
};

export default SetMap
