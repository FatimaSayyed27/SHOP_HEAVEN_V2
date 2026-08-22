import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  // =====================================================
  // FETCH PROFILE
  // =====================================================

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setError(
          "Please login to view your profile."
        );
        setLoading(false);
        return;
      }

      try {
        const data =
          await getProfile(token);

        setProfile(data);

        setFormData({
          phone: data.phone || "",
          address:
            data.address || "",
        });
      } catch (err) {
        console.error(
          "Profile error:",
          err
        );

        setError(
          err.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem(
        "access_token"
      );

    if (!token) {
      setError(
        "Please login again."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const data =
        await updateProfile(
          formData,
          token
        );

      setProfile(data);

      setFormData({
        phone: data.phone || "",
        address:
          data.address || "",
      });

      setMessage(
        "Profile updated successfully."
      );
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <p className="font-serif text-2xl mt-3 text-[#1c1a18]">
            Loading your account
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-3xl mt-4">
            Account Unavailable
          </h1>

          <p className="text-sm text-[#756e65] mt-4 leading-6">
            {error}
          </p>

          <Link
            to="/login"
            className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Login
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1a18] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">

      <div className="max-w-3xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3">
            My Account
          </h1>

          <p className="text-sm text-[#756e65] mt-3 leading-6">
            Manage your personal and delivery information.
          </p>

        </div>

        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-8">

          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}

          <div className="mb-9">

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Account
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl mt-2">
              Account Information
            </h2>

            <div className="mt-6 space-y-4">

              <div className="border-b border-[#eee8e0] pb-4">

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9b9186]">
                  Username
                </p>

                <p className="text-sm text-[#302c28] mt-2">
                  {profile?.username}
                </p>

              </div>

              <div className="border-b border-[#eee8e0] pb-4">

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9b9186]">
                  Email
                </p>

                <p className="text-sm text-[#302c28] mt-2 break-all">
                  {profile?.email}
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <form onSubmit={handleSubmit}>

            <div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                Delivery
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                Contact Information
              </h2>

            </div>

            {/* Phone */}
            <div className="mt-7">

              <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm text-[#302c28] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] transition"
              />

            </div>

            {/* Address */}
            <div className="mt-6">

              <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                Address
              </label>

              <textarea
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                rows="4"
                placeholder="Enter your complete address"
                className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm text-[#302c28] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] resize-none transition"
              />

            </div>

            {/* Message */}
            {message && (
              <div className="mt-5 bg-[#edf3ea] border border-[#dce7d7] text-[#66755f] p-4 rounded-xl text-sm">
                {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-5 bg-[#fdf0ef] border border-[#efd9d5] text-[#a45d55] p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Save */}
            <button
              type="submit"
              disabled={saving}
              className="mt-8 bg-[#1b1917] text-white px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black disabled:bg-[#aaa49d] transition"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </div>

        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <Link
            to="/orders"
            className="bg-white border border-[#e8e1d7] rounded-xl p-4 text-center hover:border-[#cfc5b8] transition"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#9a8666]">
              Account
            </p>

            <p className="font-serif text-lg mt-1">
              My Orders
            </p>
          </Link>

          <Link
            to="/wishlist"
            className="bg-white border border-[#e8e1d7] rounded-xl p-4 text-center hover:border-[#cfc5b8] transition"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#9a8666]">
              Saved
            </p>

            <p className="font-serif text-lg mt-1">
              My Wishlist
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

