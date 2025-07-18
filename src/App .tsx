import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setupAutoLogout } from "../auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    setupAutoLogout(); // ⏰ Set auto logout timer when App mounts
  }, []);

  const showHeaderFooter = () => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;
    return token && path === "/dashboard";
  };

  return (
    <GoogleOAuthProvider clientId="1044563506761-34jogvtggb6fa85d4jgl3ju4g4rteujs.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          {showHeaderFooter() && <Header />}

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

          {showHeaderFooter() && <Footer />}
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
