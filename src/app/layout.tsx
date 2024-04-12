import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/styles/global.scss";
import Navbar from '@/components/Navbar/Navbar'
import { DialogProvider } from "@/context/Dialog";
const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Finder",
  description: "Encuentra a tu compañero peludo perdido o adopta a un amigo fiel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        <DialogProvider>
          <div>{children}</div>
        </DialogProvider>
      </body>
    </html>
  );
}
