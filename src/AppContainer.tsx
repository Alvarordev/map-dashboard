import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./redux/store";
import FallbackLoader from "./components/loaders/FallbackLoader";
import axios from "axios";

import App from "./App";
import { ModalProvider } from "./context/ModalProvider";

const ErrorComponent = ({ errorMessage }: { errorMessage: string | null }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

const AppContainer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get("/server-status");
      } catch (err) {
        setError("Server is down. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkServerStatus();
  }, []);

  if (loading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {loading ? <FallbackLoader /> : <ErrorComponent errorMessage={error} />}
      </div>
    );
  }

  return (
    <Provider store={store}>
      <ModalProvider>
        <>
          <Toaster position="top-center" richColors />
          <App />
        </>
      </ModalProvider>
    </Provider>
  );
};

export default AppContainer;
