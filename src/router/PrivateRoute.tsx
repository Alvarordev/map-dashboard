import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return (
    <main className="flex text-primary min-h-screen bg-background">
      <Sidebar />
      <div className="p-8 w-full relative">
        <Outlet />
      </div>
    </main>
  );
};

export default PrivateRoute;
