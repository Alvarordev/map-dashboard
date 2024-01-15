import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./redux/store";

import App from "./App";
import { ModalProvider } from "./context/ModalProvider";

const AppContainer = () => {
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
