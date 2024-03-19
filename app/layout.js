import { Nunito } from "next/font/google";
import "./globals.css";

//import components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageViews from "@/utils/pageviews";

export const nunito_init = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "My Wishlists",
  description: "Create and share your Wishlists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito_init.variable}>
        <Navbar />
        {children}
        <Footer />
      </body>
      <PageViews />
    </html>
  );
}
