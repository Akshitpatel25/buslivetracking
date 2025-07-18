import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
// Save token and username
export const saveToken = (token: string) => localStorage.setItem("token", token);
export const saveUsername = (username: string) => localStorage.setItem("username", username);

// Get token or username
export const getToken = (): string | null => localStorage.getItem("token");
export const getUsername = (): string | null => localStorage.getItem("username");

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "/"; // Redirect to login page
};

// ✅ Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp; // expiration in seconds
    return exp * 1000 < Date.now();
  } catch (err) {
    return true; // Treat as expired if invalid token
  }
};

// ✅ Start session timeout logout timer
export const setupAutoLogout = () => {
  const token = getToken();
  if (token) {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeout = exp - now;

    if (timeout <= 0) {
      logout();
    } else {
      setTimeout(() => {
        toast.error("Your session has expired. Please login again.");
        logout();
      }, timeout);
    }
  }
};
