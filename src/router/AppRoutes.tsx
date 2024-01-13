import Dashboard from "../pages/Dashboard";
import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Multas from "../pages/Multas";
import NotFound from "../pages/NotFound";
import TipoCepo from "../pages/TipoCepo";

export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ds/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/multas",
    element: <Multas />,
  },
  {
    path: "/tipocepo",
    element: <TipoCepo />,
  },
  {
    path: "/empresas",
    element: <Empresas />,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
