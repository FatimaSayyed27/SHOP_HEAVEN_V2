
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.password !==
      formData.password2
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      setSuccess(
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(
        "Signup error:",
        err
      );

      setError(
        err.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-8">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3 text-[#1c1a18]">
            Create Account
          </h1>

          <p className="text-sm text-[#756e65] mt-3">
            Begin your journey with Shop Haven.
          </p>

        </div>

        {/* =================================================
            FORM CARD
        ================================================= */}

        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-8">

          {/* ERROR */}
          {error && (
            <div className="mb-6 bg-[#fdf0ef] border border-[#efd9d5] text-[#a45d55] text-sm p-4 rounded-xl">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-6 bg-[#edf3ea] border border-[#dce7d7] text-[#66755f] text-sm p-4 rounded-xl">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* USERNAME */}
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
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm text-[#302c28] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] transition"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Enter email"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm text-[#302c28] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] transition"
              />

            </div>

            {/* PASSWORD */}
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
                autoComplete="new-password"
                placeholder="Create password"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm text-[#302c28] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] transition"
              />

            </div>

            {/* CONFIRM PASSWORD */}
            <div>

              <label
                htmlFor="password2"
                className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
              >
                Confirm Password
              </label>

              <input
                id="password2"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
                autoComplete="new-password"
                placeholder="Confirm password"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm text-[#302c28] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] transition"
              />

            </div>

            {/* SIGN UP */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b1917] text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-black disabled:bg-[#aaa49d] transition"
            >
              {loading
                ? "Creating Account..."
                : "Sign Up"}
            </button>

          </form>

          {/* LOGIN */}
          <p className="text-center text-sm text-[#756e65] mt-7">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#1c1a18] font-medium underline underline-offset-4 hover:text-[#8f7753] transition"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}

export default SignupPage;

