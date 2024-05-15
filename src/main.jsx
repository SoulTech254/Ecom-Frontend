import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Toaster } from 'sonner';
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster visibleToasts={1} position='top-right' richColors />
    </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
