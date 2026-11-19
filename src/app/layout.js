import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

// Body font: Satoshi (variable, weights 300–900)
const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Variable.woff2', weight: '300 900', style: 'normal' },
    { path: './fonts/Satoshi-VariableItalic.woff2', weight: '300 900', style: 'italic' },
  ],
  variable: '--font-manrope',
  display: 'swap',
});

// Accent font: Zodiak (variable, weights 100–900)
const zodiak = localFont({
  src: [
    { path: './fonts/Zodiak-Variable.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/Zodiak-VariableItalic.woff2', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-antique',
  display: 'swap',
});

export const metadata = {
  title: "Paris Bozzuti",
  description: "Portfolio website for data scientist Paris Bozutti.",
  icons: {
    icon: "/images/portfolio-fav-icon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${zodiak.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
