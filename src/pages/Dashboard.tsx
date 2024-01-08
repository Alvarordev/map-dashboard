import DataTable from "../components/dashboard/DataTable";
import MapView from "../components/map/MapView";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <MapView />
      <DataTable />
    </div>
  );
};

export default Dashboard;
