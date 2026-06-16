import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Yönetim Paneli — Özcan Dekorasyon",
  robots: { index: false, follow: false },
};

// Root layout for the (non-localized) admin branch.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
