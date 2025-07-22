import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const SERVER_URI = `${import.meta.env.VITE_SERVER_URI}`;
export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();
  const email = localStorage.getItem("email") || localStorage.getItem("driverEmail");

  const user = {
    name: email?.slice(0, email.indexOf("@")),
    email: email,
    avatarUrl: "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png", 
  };

  // useEffect(() => {
  //   async function handleTokenCheck() {
  //     const res = await fetch(`${SERVER_URI}/api/token`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (res.status != 200) {
  //       localStorage.removeItem("email");
  //       localStorage.removeItem("driverEmail");
  //       const logoutRes = await fetch(`${SERVER_URI}/api/logout`, {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (logoutRes.status == 200) {
  //         navigate("/login");
  //       }
  //     } else {
  //       const email =
  //         localStorage.getItem("email") || localStorage.getItem("driverEmail");
  //       if (email) {
  //         setIsLoggedIn(true);
  //       }
  //     }
  //   }

  //   handleTokenCheck();
  // }, []);

  const handleLogout = async () => {
    const isDriver = localStorage.getItem("driverEmail");
    console.log(isDriver);
    if (isDriver) {
      const busNumber = localStorage.getItem("busNumber");
      try {
        const res = await fetch(`${SERVER_URI}/api/driverLogout`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ busNumber }),
        });
        if (res.status == 200) {
          localStorage.removeItem("driverEmail");
          localStorage.removeItem("busNumber");
          window.location.href = "/login";
        }
        // optionally redirect or update UI
      } catch (error) {
        console.error("DriverLogout error:", error);
      }
    } else {
      try {
        const res = await fetch(`${SERVER_URI}/api/logout`, {
          method: "GET",
          credentials: "include", // this is critical!
        });
        if (res.status == 200) {
          localStorage.removeItem("email");
          window.location.href = "/login";
        }
        // optionally redirect or update UI
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Bus Tracker
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-4 hidden md:flex items-center">
          {/* <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Option 1
          </Link> */}
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                {isloggedIn ? "Logout" : "Login"}
              </button>
          {/* User Profile Avatar */}
          <div className="ml-6 relative group">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg cursor-pointer border border-blue-200">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : ( ""
              )}
            </div>
            {/* Dropdown on hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <div className="p-4 border-b">
                {/* <div className="font-semibold">{user.name}</div> */}
                <div className="font-semibold text-gray-500">{user.email}</div>
              </div>
              
            </div>
          </div>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Drawer for mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-black bg-opacity-0`}
        style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`bg-white w-64 h-full shadow-lg p-6 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Profile at top of sidebar */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border border-blue-200">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (""
              )}
            </div>
            <div>
              {/* <div className="font-semibold">{user.name}</div> */}
              <div className="font-semibold text-gray-500">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-8"></div>
          <nav className="flex flex-col space-y-4">
            {/* <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition text-lg"
              onClick={() => setSidebarOpen(false)}
            >
              Option 1
            </Link> */}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline text-lg text-left"
            >
              {isloggedIn ? "Logout" : "Login"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
