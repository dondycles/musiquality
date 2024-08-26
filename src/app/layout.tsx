import type { Metadata } from "next";
import { Cormorant_Unicase, Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";

const gloock = Cormorant_Unicase({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gloock",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "MusiQuality",
  description: "Quality music sheets for sale!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gloock.variable} ${poppins.variable} font-poppins bg-background text-foreground`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
