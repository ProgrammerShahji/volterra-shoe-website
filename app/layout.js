import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Providers } from "../components/Providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import Cursor from "../components/Cursor";
import ToTop from "../components/ToTop";
import SmoothScroll from "../components/SmoothScroll";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Volterra | Move Faster, Go Further",
  description: "Lightweight, breathable running shoes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <SmoothScroll>
            <Cursor />
            <Header />

            <main>{children}</main>

            <Footer />
            <CartDrawer />
            <ToTop />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
