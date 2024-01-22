import { lazy } from "react";

import Dashboard from "../pages/Dashboard";
import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Multas from "../pages/Multas";
import TipoCepo from "../pages/TipoCepo";
import Preferences from "../pages/Preferences";
import Perfil from "../pages/Perfil";
import Usuario from "../pages/Usuario";

const NotFound = lazy(() => import("../pages/NotFound"));

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
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/usuario",
    element: <Usuario />,
  },
  {
    path: "/empresas",
    element: <Empresas />,
  },
  {
    path: "/preferencias",
    element: <Preferences />,
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
