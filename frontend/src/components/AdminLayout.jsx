import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a18]">

      <div className="flex min-h-screen flex-col lg:flex-row">

        {/* =================================================
            ADMIN SIDEBAR
        ================================================= */}

        <AdminSidebar />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="flex-1 min-w-0 w-full">

          <div className="w-full px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-8">

            {/* subtle top divider */}
            <div className="border-b border-[#e7e0d7] mb-6 lg:mb-8" />

            <Outlet />

          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminLayout;

