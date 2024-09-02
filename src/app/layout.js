"use client"
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = usePathname();
  const showHeader = !(params === '/sign-in' || params === '/create-account');

  return (
    <html lang="en">
      <body className={roboto.className}>
        {showHeader && <Header />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
