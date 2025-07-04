import { useState, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoutes } from "./routes";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  // Recreate router when auth state changes
  const router = useMemo(
    () =>
      createBrowserRouter(
        createRoutes(isAuthenticated, handleLogin, handleLogout)
      ),
    [isAuthenticated]
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
