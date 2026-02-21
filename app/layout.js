"use client";

import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Cart from "@/components/Cart";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);

  const isAdminSubPage = pathname.startsWith("/admin/") && pathname !== "/admin";
  const isAdminMainPage = pathname === "/admin";

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Provider store={store}>
          {isAdminSubPage ? (
            <div className="flex min-h-screen">
              <SideBar
                isOpen={adminSidebarOpen}
                onClose={() => setAdminSidebarOpen(false)}
              />
              <main className="flex-1 bg-white min-h-screen relative lg:pl-0">
                <button
                  type="button"
                  onClick={() => setAdminSidebarOpen(true)}
                  className="lg:hidden fixed top-4 left-4 z-40 w-11 h-11 flex items-center justify-center rounded-xl bg-[#8B7355] text-white shadow-lg hover:bg-[#7A6349] transition-all"
                  aria-label="Open admin menu"
                >
                  <FaBars size={20} />
                </button>
                <div className="pt-16 lg:pt-0 pl-4 pr-4 lg:pl-8">
                  {children}
                </div>
              </main>
            </div>
          ) : isAdminMainPage ? (
            <main className="bg-white min-h-screen">{children}</main>
          ) : (
            <>
              <Navbar />
              <main className="bg-[#ffffff] min-h-screen">{children}</main>
              <Cart />
              <Footer />
            </>
          )}
        </Provider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
