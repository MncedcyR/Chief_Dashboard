import React, { useState } from "react";
import { ShieldCheckIcon } from "lucide-react";
interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative max-w-sm bg-gradient-to-t from-white to-gray-100 rounded-3xl p-6 border-4 border-white shadow-lg backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/polbg.jpg')] bg-cover bg-center filter blur-sm opacity-50 rounded-lg"></div>
        <div className="relative z-10 text-gray-900">
          <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 z-10 flex items-center justify-center mb-4">
            <ShieldCheckIcon size={32} className="text-white" />
          </div>
          <h1 className="text-center font-extrabold text-blue-500">
            Police Administration Portal
          </h1>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Officer Name"
              className=" placeholder:text-blue-500 w-full bg-transparent border-b-4 border-blue-500  px-4 py-3 rounded-xl shadow focus:outline-none focus:border-blue-400"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              required
              className="placeholder:text-blue-500 w-full bg-transparent border-b-4 border-blue-500  px-4 py-3 rounded-xl shadow focus:outline-none focus:border-blue-400"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span className="block mt-2 ml-2 text-sm text-blue-500">
              <a href="#">Forgot Password?</a>
            </span>
            <input
              className="w-full font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl shadow-md hover:scale-105 transition transform"
              type="submit"
              value="Sign In"
            />
          </form>
          <span className="block text-center mt-4 text-xs text-blue-500">
            <a href="#">Learn user licence agreement</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
