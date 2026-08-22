
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { saveTokens } from "../utils/auth";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(
        formData.username,
        formData.password
      );

      console.log("LOGIN RESPONSE:", data);

      saveTokens(data);

      const userData = {
        username:
          data.username ||
          formData.username,

        is_staff:
          data.is_staff === true,

        is_superuser:
          data.is_superuser === true,
      };

      console.log("USER DATA:", userData);

      login(userData);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3 text-[#1c1a18]">
            Welcome Back
          </h1>

          <p className="text-sm text-[#756e65] mt-3">
            Sign in to continue to your account.
          </p>

        </div>

        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-8">

          {error && (
            <div className="mb-6 bg-[#fdf0ef] border border-[#efd9d5] text-[#a45d55] p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label
                htmlFor="username"
                className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="Enter username"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b1917] text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-black disabled:bg-[#aaa49d] transition"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

          <p className="text-center text-sm text-[#756e65] mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#1c1a18] font-medium underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;

