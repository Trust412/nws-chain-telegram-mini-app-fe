import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
// import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
// import Script from 'next/script'; // Import the Script component
import { Provider as JotaiProvider } from "jotai";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tap to Earn Game",
  description: "NWS Telegram Mini App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
          defer
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <WebAppProvider> */}
        <JotaiProvider>{children}</JotaiProvider>
        {/* </WebAppProvider> */}
      </body>
    </html>
  );
}
