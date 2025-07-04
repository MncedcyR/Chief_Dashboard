// src/routes.tsx
import { Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";

export function createRoutes(
  isAuthenticated: boolean,
  onLogin: () => void,
  onLogout: () => void
) {
  if (!isAuthenticated) {
    return [
      { path: "/login", element: <Login onLogin={onLogin} /> },
      { path: "*", element: <Navigate to="/login" /> },
    ];
  }

  return [
    {
      path: "/",
      element: <Layout onLogout={onLogout} />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "employees", element: <Employees /> },
        { path: "tasks", element: <Tasks /> },
        { path: "schedule", element: <Schedule /> },
        { path: "reports", element: <Reports /> },
        { path: "/", element: <Navigate to="dashboard" /> },
      ],
    },
    { path: "*", element: <Navigate to="/dashboard" /> },
  ];
}
