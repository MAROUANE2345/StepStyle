"use client";

import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Cart from "@/components/Cart"; // adjust path if needed
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar/>
          {children}

          {/* Global Cart */}
          <Cart />
        </Provider>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
