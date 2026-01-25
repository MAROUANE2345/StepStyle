"use client"
import "./globals.css";
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from "@/lib/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        <Provider store={store}>
          {children}
        </Provider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
