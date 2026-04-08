import type { Metadata } from "next";
import "./globals.css";
import ShellWrapper from "@/components/ShellWrapper";

export const metadata: Metadata = {
  title: "Azania Fast Food | Order Kasi Favourites Online",
  description: "Order your favourite bunny chows, ribs, kota and kasi fast food from Azania — fast, fresh, and delivered to your door across Orange Farm and surrounds.",
  keywords: "Azania, bunny chow, kota, ribs, kasi food, Orange Farm, fast food delivery, South Africa",
  openGraph: {
    title: "Azania Fast Food",
    description: "Kasi fast food delivered hot and fresh to your door.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ShellWrapper>
          {children}
        </ShellWrapper>
      </body>
    </html>
  );
}
