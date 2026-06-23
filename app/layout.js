import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "IDVault - Digital Identity & Password Manager",
  description:
    "Securely store your digital ID card and manage all your passwords in one private, encrypted vault.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning={true}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-2">{children}</main>
        <Toaster
          richColors={false}
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--surface)",
              border: "1px solid var(--border-subtle)",
              color: "var(--foreground)",
              fontSize: "0.875rem",
            },
          }}
        />
      </body>
    </html>
  );
}
