import { Nunito } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import CheckSupabaseInstance from "@/utils/checkSupabaseInstance";

//import components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpdateUserCookie from "@/components/UpdateUserCookie";
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
    <ViewTransitions>
      <html lang="en">
        <body className={nunito_init.variable}>
          <CheckSupabaseInstance />
          <Navbar />
          {children}
          <Footer />
        </body>
        <PageViews />
        <UpdateUserCookie />
      </html>
    </ViewTransitions>
  );
}
