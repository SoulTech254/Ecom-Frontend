import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<RegistrationPage />} />
      <Route path="/sign-in" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
