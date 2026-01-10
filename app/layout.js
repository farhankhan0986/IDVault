import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

export const metadata = {
  title: "IDVault- Digital ID Card Manager",
  description: "Securely store and manage your digital IDs with IDVault.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {children}
          <Toaster richColors position="bottom-right" />
        </main>
      </body>
    </html>
  );
}
