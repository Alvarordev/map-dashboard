import { Suspense } from "react";
import FallbackLoader from "./components/loaders/FallbackLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes } from "./router/AppRoutes";
import Login from "./pages/Login";
import DefaultLayout from "./layout/DefaultLayout";
import { MapProvider } from "./context/map-context";

function App() {
  const userData = null;

  return (
    <MapProvider>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route element={<DefaultLayout />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route
            path="/login"
            element={userData ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </Suspense>
    </MapProvider>
  );
}

export default App;
