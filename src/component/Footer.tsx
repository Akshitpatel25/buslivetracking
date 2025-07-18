import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const showFooter = token && location.pathname === "/dashboard";
  if (!showFooter) return null;

  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AuthApp · Built with React + Tailwind
      </div>
    </footer>
  );
}
