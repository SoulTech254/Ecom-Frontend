import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <AppRoutes />
          </QueryClientProvider>
        </Router>
        <Toaster visibleToasts={1} position="top-center" richColors />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
