"use client";

import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Cart from "@/components/Cart"; // adjust path if needed
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar"; // for admin subpages
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Admin layout for subpages (has sidebar)
  const isAdminSubPage = pathname.startsWith("/admin/") && pathname !== "/admin";

  // Main /admin page (no navbar, no sidebar)
  const isAdminMainPage = pathname === "/admin";

  return (
    <html lang="en">
      <body className="min-h-screen">
        <Provider store={store}>
          {isAdminSubPage ? (
            // Admin subpages layout with sidebar
            <div className="flex min-h-screen">
              <SideBar /> {/* beige background only here */}
              <main className="flex-1 bg-white min-h-screen">
                {children}
              </main>
            </div>
          ) : isAdminMainPage ? (
            // Main admin page: white background
            <main className="bg-white min-h-screen">{children}</main>
          ) : (
            // Public pages (with Navbar)
            <>
              <Navbar />
              <main className="bg-[#ffffff] min-h-screen">{children}</main>

              {/* Global Cart */}
              <Cart />
            </>
          )}
        </Provider>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
