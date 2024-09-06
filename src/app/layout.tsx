import type { Metadata } from "next";
import { Cormorant_Unicase, Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { UserDataProvider } from "@/components/user-data-provider";

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
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <QueryProvider>
          <AuthProvider>
            <UserDataProvider>{children}</UserDataProvider>
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
