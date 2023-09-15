import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Victor Almeida",
  description: "Personal web portfolio",
  icons: "/icons/favicon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#e4e4e4] dark:bg-[#1d1d1d]">{children}</body>
    </html>
  );
}
