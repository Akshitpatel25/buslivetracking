import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { useEffect, useState } from "react";
import DriverDashboard from "./pages/DriverDashboard";


function App() {
  const [isDriver, setisDriver] = useState(false);
  useEffect(() => {
    const driverEmail = localStorage.getItem("driverEmail");
    if (driverEmail) {
      setisDriver(true);
    }
  }, [])
  

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            {isDriver ? <Route path="/" element={<DriverDashboard/>}/> :<Route path="/" element={<Dashboard />} />}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/driver" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
