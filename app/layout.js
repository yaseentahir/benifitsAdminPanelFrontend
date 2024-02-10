import { ToastContainer } from "react-toastify";
import { BenefitsAdminPanelCtxProvider } from "./context";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Benefits Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BenefitsAdminPanelCtxProvider>
          {children}
        </BenefitsAdminPanelCtxProvider>
      </body>
    </html>
  );
}
