import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "../ui/Button";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (localStorage) {
      localStorage.removeItem("authToken");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const routes = [
    {
      title: "Dashboard",
      path: "ds/dashboard",
      icon: <LayoutDashboard />,
      active: location.pathname === "/ds/dashboard" ? "bg-accent" : "",
    },
    {
      title: "Empresas",
      path: "empresas",
      icon: <LayoutDashboard />,
      active: location.pathname === "/empresas" ? "bg-accent" : "",
    },
  ];

  return (
    <aside className="text-primary-foreground bg-foreground flex flex-col min-h-full w-full max-w-64 py-8 px-6">
      <h2 className="text-center text-3xl font-semibold pb-10">SIDEBAR</h2>

      <ul className="flex flex-col gap-2.5 py-5">
        {routes.map((route) => (
          <Link key={route.path} to={route.path}>
            <li
              className={`${route.active} flex gap-2 items-center py-2 px-5 rounded-xl transition-all hover:text-accent`}
            >
              {route.icon}
              {route.title}
            </li>
          </Link>
        ))}
      </ul>

      <div className="mt-auto">
        <Button onClick={logOut} className="flex gap-2" variant="ghost">
          <>
            <LogOut />
            LogOut
          </>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
