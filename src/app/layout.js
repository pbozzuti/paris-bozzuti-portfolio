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

// Runs before paint so the saved/system theme is applied without a light-mode flash.
const themeScript = `(function(){try{
  var m = window.matchMedia('(prefers-color-scheme: dark)');
  var apply = function(){
    var t = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', t ? t === 'dark' : m.matches);
  };
  apply();
  m.addEventListener('change', function(){ if (!localStorage.getItem('theme')) apply(); });
}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
