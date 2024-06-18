import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "./components/home/header";
import SessionAuthProvider from "./components/Provider";
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Groups",
  description: "Plataforma de comunicaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAuthProvider>
          <Header />
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
