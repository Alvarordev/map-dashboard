import { Suspense } from "react";
import FallbackLoader from "./components/loaders/FallbackLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes } from "./router/AppRoutes";
import Login from "./pages/Login";
import RoutesLayout from "./router/RoutesLayout";
import { useAppSelector } from "./redux/store";

function App() {
  const accessToken = localStorage.getItem("authToken");
  const userData = useAppSelector((state) => state.auth.userData)

  return (
    <Suspense fallback={<FallbackLoader />}>
      <Routes>
        <Route element={<RoutesLayout userData={userData}/>}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="/login"
          element={accessToken ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
