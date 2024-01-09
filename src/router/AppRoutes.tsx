import Dashboard from "../pages/Dashboard";
import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/ds/dashboard',
    element: <Dashboard/>
  },
  {
    path: "/empresas",
    element: <Empresas />,
  }
];

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />
  }
]