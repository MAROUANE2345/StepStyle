"use client";

import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Cart from "@/components/Cart"; // adjust path if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}

          {/* Global Cart */}
          <Cart />
        </Provider>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
