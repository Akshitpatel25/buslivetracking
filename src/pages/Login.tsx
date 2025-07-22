import { useEffect, useState } from "react";

const SERVER_URI = `${import.meta.env.VITE_SERVER_URI}:${import.meta.env.VITE_SERVER_PORT}`;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [isDriver, setIsDriver] = useState(false);


  const handleLogin = async () => {
    const emailCheck =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(email, password, busNumber);
    if (isDriver) {
      if (email === "" || password === "" || busNumber === "") {
        alert("Please enter email and password.(Driver)");
        return;
      }
      // email regax validation

      if (!emailCheck.test(email)) {
        alert("Please enter a valid email.");
        return;
      }

      try {
        const response = await fetch(`${SERVER_URI}/api/driverLogin`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, busNumber }),
        });

        if (response.status === 200) {
          localStorage.setItem("driverEmail", email);
          localStorage.setItem("busNumber", busNumber.toLowerCase().trim());
          window.location.href = "/";
        } else {
          console.log("Driver Login failed", response);
          alert(JSON.stringify(response));
        }
      } catch (error) {
        console.log("Error during Driver-login:", error);
      }
    } else {
      if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
      }
      if (!emailCheck.test(email)) {
        alert("Please enter a valid email.");
        return;
      }

      try {
        const response = await fetch(`${SERVER_URI}/api/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          localStorage.setItem("email", email);
          window.location.href = "/";
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to Your Account
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          {isDriver && (
            <input
              type="text"
              placeholder="Bus Number (DD-01-T-1234)"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBusNumber(e.target.value)}
            />
          )}

          <a
            onClick={() => setIsDriver(!isDriver)}
            className="cursor-pointer text-blue-600 flex justify-end"
          >
            {isDriver ? "Login as User" : "Login as Driver"}
          </a>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
