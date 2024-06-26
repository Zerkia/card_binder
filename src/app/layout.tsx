import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import CardsProvider from "@/context/CardsProvider";
import './globals.css';
import { Providers } from "./Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserProvider";

const roboto = Roboto({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <CardsProvider>
            <UserProvider>
              <Header />
              {children}
              <Footer />
            </UserProvider>
          </CardsProvider>
        </Providers>
      </body>
    </html>
  );
}
