import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "IDVault - Digital Identity & Password Manager",
  description:
    "Securely store your digital ID card and manage all your passwords in one private, encrypted vault.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  metadataBase: new URL("https://id-vault.vercel.app"),
  openGraph: {
    title: "IDVault - Digital Identity & Password Manager",
    description:
      "Create a shareable digital ID card and manage all your passwords in one private, encrypted vault. Free, no subscriptions.",
    url: "https://id-vault.vercel.app",
    siteName: "IDVault",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IDVault - Digital Identity & Password Manager",
    description:
      "Create a shareable digital ID card and manage all your passwords in one private, encrypted vault.",
  },
  keywords: [
    "digital ID card",
    "password manager",
    "encrypted vault",
    "visiting card online",
    "free password manager",
    "digital identity",
    "IDVault",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning={true}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "IDVault",
              url: "https://id-vault.vercel.app",
              description:
                "Securely store your digital ID card and manage all your passwords in one private, encrypted vault.",
              applicationCategory: "SecurityApplication",
              operatingSystem: "Web, Android, iOS",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              author: {
                "@type": "Person",
                name: "Farhan Abid",
              },
            }),
          }}
        />
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-2">{children}</main>
        <Analytics />
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
