import { Map } from "leaflet";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface Props {
  children: JSX.Element;
}

interface MapContextValue {
  map: Map | null;
  setMap: Dispatch<SetStateAction<Map | null>>;
}

const MapContext = createContext({} as MapContextValue);

export const MapProvider = ({ children }: Props) => {
  const [map, setMap] = useState<Map | null>(null);

  console.log("Map:", map);

  const value = {
    map,
    setMap,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }

  const { map, setMap } = context;

  return { map, setMap };
};
