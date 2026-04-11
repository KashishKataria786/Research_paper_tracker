import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/landingpage/HomePage.jsx";
import AddPaper from "./pages/user/AddPaper.jsx";
import NotFound from "./pages/common/NotFound.jsx";
import AnalyticsPage from "./pages/user/AnalyticsPage.jsx";
import PapersPage from "./pages/user/PapersPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Layout from "./components/layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <>
    <ToastContainer/>
    <AuthProvider>
      <Routes>
        {/* Main Site Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
        {/* Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/add-paper" element={<AddPaper />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<AnalyticsPage />} />
            <Route path="papers" element={<PapersPage />} />
            <Route path="library" element={<PapersPage />} />
            </Route>
        </Route>
        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
