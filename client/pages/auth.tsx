import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

interface JwtPayload {
  sub: string;
  email: string;
}

interface AuthResponse {
  data: {
    access_token: string;
  };
}

export default function AuthPage() {
  const [email, setEmail] = useState("your_username");
  const [password, setPassword] = useState("your_password");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const response = await axios.post(`/api${endpoint}`, {
        email,
        password,
      });
      if (!isLogin) {
        setIsLogin(!isLogin);
      } else {
        auth(response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || "An unexpected error occurred"
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error auth:", error);
    }

    function auth(response: AuthResponse) {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded JWT:", decoded);
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="max-w-sm mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Login" : "Register"}
      </h1>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full mt-4 text-blue-500 font-semibold hover:underline transition duration-300"
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>
    </div>
  );
}
