import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

import Nav from "./components/Nav";
import Provider from "./components/Provider";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZticks",
  description: "The number one platfrom for ticket selling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide/>
        <>
        <div className="">
          <div className=""></div>
        </div>
        <main className="">
          <div className="">
          </div>
          {children}
        </main>
        </>
      </body>
    </html>
  );
}
