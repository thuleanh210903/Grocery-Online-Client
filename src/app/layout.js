"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = usePathname();
  const showHeader = !(params === "/sign-in" || params === "/create-account");
  const [updateCart, setUpdateCart] = useState(false)
  return (
    <PayPalScriptProvider options={{clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
    <html lang="en">
      <body className={roboto.className}>
        <UpdateCartContext.Provider value={{updateCart,setUpdateCart}}>
          {showHeader && <Header />}
          {children}
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
    </PayPalScriptProvider>
  );
}
