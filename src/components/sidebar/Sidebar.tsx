import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, PanelLeft, Building2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { logOut: logOutAction } = useAuth();

  const routes = [
    {
      title: "Dashboard",
      path: "ds/dashboard",
      icon: <LayoutDashboard />,
      active:
        location.pathname === "/ds/dashboard"
          ? "bg-accent hover:text-white"
          : "",
    },
    {
      title: "Empresas",
      path: "empresas",
      icon: <Building2 />,
      active:
        location.pathname === "/empresas" ? "bg-accent hover:text-white" : "",
    },
  ];

  return (
    <aside
      className={`${
        toggleSidebar ? "max-w-24" : ""
      } text-primary-foreground bg-foreground flex flex-col min-h-full w-full max-w-64 py-8 px-6 transition-all`}
    >
      <header className="flex justify-between items-center pb-10">
        <h2
          className={`${
            toggleSidebar ? "hidden" : ""
          } text-center text-2xl font-semibold`}
        >
          LOGO
        </h2>

        <Button
          variant="ghost"
          onClick={() => {
            setToggleSidebar(!toggleSidebar);
          }}
        >
          <PanelLeft />
        </Button>
      </header>

      <ul className="flex flex-col gap-2.5 py-5">
        {routes.map((route) => (
          <Link key={route.path} to={route.path}>
            <li
              className={`${route.active} ${
                toggleSidebar && "justify-center"
              } flex gap-2 items-center py-2 px-5 rounded-xl transition-all hover:text-accent`}
            >
              <span className="h-full">{route.icon}</span>
              <span className={`${toggleSidebar ? "hidden" : ""}`}>
                {route.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          onClick={() => logOutAction(navigate)}
          className="flex gap-2"
          variant="ghost"
        >
          <>
            <LogOut />
            <span className={`${toggleSidebar ? "hidden" : ""}`}>
              Cerrar sesión
            </span>
          </>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
