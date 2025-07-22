import { useState, useEffect } from "react";

export default function Dashboard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busNumberSearch, setBusNumberSearch] = useState("");
  const [location, setlocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setlocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

    console.log(location);
  }, []);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* 🔍 Search by From/To */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl mb-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Search Buses by Route
        </h2>
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter starting point"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition font-semibold"
            >
              🚍 Search Buses
            </button>
          </div>
        </form>
      </div>
      {/* 🔍 Search by Bus Number */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl mb-8">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
          Search by Bus Number
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter bus name or number e.g., Express 101"
            value={busNumberSearch}
            onChange={(e) => setBusNumberSearch(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition font-semibold"
          >
            🔍 Search by Bus Name
          </button>
        </form>
      </div>
    </div>
  );
}
