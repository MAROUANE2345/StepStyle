"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";

const SideBar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const linkClasses =
    "flex items-center px-4 py-3 rounded-lg font-semibold text-[#5C4A3A] hover:bg-[#DCCDBA] cursor-pointer transition-colors duration-200";

  const activeLinkClasses =
    "flex items-center px-4 py-3 rounded-lg font-semibold bg-[#8B7355] text-white cursor-pointer transition-colors duration-200";

  const links = [
    { name: "Add Product", path: "/admin/adminadd", icon: "➕" },
    { name: "Manage Products", path: "/admin/adminmanage", icon: "📦" },
    { name: "Orders", path: "/admin/adminorder", icon: "🛍️" },
    { name: "Back to Store", path: "/", icon: "↩️" },
  ];

  // ✅ Updated navigate function
  const navigate = (path) => {
    if (path === "/") {
      // Remove admin token cookie (logout)
      document.cookie =
        "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }

    router.push(path);
    onClose?.();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 lg:justify-center lg:py-6 border-b border-[#E8DCC8]">
        <h1 className="text-xl lg:text-2xl font-extrabold text-[#5C4A3A]">
          StepStyle Admin
        </h1>

        <button
          type="button"
          onClick={onClose}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#E8DCC8] text-[#5C4A3A] transition"
          aria-label="Close menu"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2 p-4">
        {links.map((link) => (
          <div
            key={link.name}
            onClick={() => navigate(link.path)}
            className={
              pathname === link.path ? activeLinkClasses : linkClasses
            }
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose?.()}
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`
          h-screen flex flex-col bg-[#F5F0E8] border-r-2 border-[#E8DCC8]
          lg:relative lg:translate-x-0 lg:w-64 flex-shrink-0
          fixed lg:static top-0 left-0 z-50 w-72 max-w-[85vw]
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default SideBar;