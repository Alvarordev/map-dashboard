import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const DefaultLayout = () => {
  return (
    <main className="flex text-primary min-h-screen bg-background">
      <Sidebar />
      <div className="p-8 w-full relative">
      <Outlet />
      </div>
    </main>
  );
};

export default DefaultLayout;
