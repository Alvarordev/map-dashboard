import Dashboard from "../pages/Dashboard";
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
  }
];

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />
  }
]