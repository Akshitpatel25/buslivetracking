import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Placeholder user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "", // leave empty for initials
  };
  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          Bus Tracker
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-4 hidden md:flex items-center">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Option 1
          </Link>
          <button className="text-red-600 hover:underline">Logout</button>
          {/* User Profile Avatar */}
          <div className="ml-6 relative group">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg cursor-pointer border border-blue-200">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>
            {/* Dropdown on hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <div className="p-4 border-b">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
            </div>
          </div>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar Drawer for mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-black bg-opacity-30`}
        style={{ pointerEvents: sidebarOpen ? 'auto' : 'none' }}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`bg-white w-64 h-full shadow-lg p-6 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >

          {/* User Profile at top of sidebar */}
          <div className="flex items-center space-x-3 mb-8">

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border border-blue-200">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-8">

          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition text-lg"
              onClick={() => setSidebarOpen(false)}
            >
              Option 1
            </Link>
            <button className="text-red-600 hover:underline text-lg text-left">Logout</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
