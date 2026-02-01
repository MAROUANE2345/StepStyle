"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current path

  const linkClasses =
    "flex items-center px-4 py-3 rounded font-semibold text-[#5C4A3A] hover:bg-[#DCCDBA] cursor-pointer transition-colors duration-200";
  const activeLinkClasses =
    "flex items-center px-4 py-3 rounded font-semibold bg-[#8B7355] text-white cursor-pointer transition-colors duration-200";

  const links = [
    { name: "Add Product", path: "/admin/adminadd", icon: "➕" },
    { name: "Manage Products", path: "/admin/adminmanage", icon: "📦" },
    { name: "Orders", path: "/admin/adminorder", icon: "🛍️" },
    { name: "Back to Store", path: "/", icon: "↩️" },
  ];

  return (
    <div
      className="h-screen w-64 bg-[#F5F0E8] flex flex-col"
      style={{ borderRight: "2px solid #E8DCC8" }}
    >
      {/* Top Title */}
      <div className="flex items-center justify-center py-6">
        <h1 className="text-2xl font-extrabold text-[#5C4A3A]">
          StepStyle Admin
        </h1>
      </div>

      {/* Sidebar links */}
      <div className="flex-1 flex flex-col gap-2 p-4 rounded-[8px]">
        {links.map((link) => (
          <div
            key={link.name}
            onClick={() => router.push(link.path)}
            className={pathname === link.path ? activeLinkClasses : linkClasses} // ✅ active check
          >
            <span className="mr-3">{link.icon}</span> {link.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
