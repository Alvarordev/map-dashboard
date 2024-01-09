import { useState } from "react";
import DataTable from "../components/dashboard/DataTable";
import MapView from "../components/map/MapView";
import type { Map } from "leaflet";

const Dashboard = () => {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <MapView onMapChange={setMap} />
      <DataTable map={map} />
    </div>
  );
};

export default Dashboard;
