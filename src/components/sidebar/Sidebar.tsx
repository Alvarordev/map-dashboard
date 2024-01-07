import { Link } from "react-router-dom";

const Sidebar = () => {
  const routes = [
    {
      title: "Dashboard",
      path: "ds/dashboard",
    },
    {
      title: "Empresas",
      path: "empresas",
    },
  ];

  return (
    <aside className="text-primary-foreground bg-foreground min-h-full w-full max-w-64 p-8">
      <h2 className="text-center text-3xl font-semibold pb-12">SIDEBAR</h2>

      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
