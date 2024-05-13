//"use client"
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/styles/global.scss";
import Navbar from '@/components/Navbar/Navbar'
import { DialogProvider } from "@/context/Dialog";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/Authentication";
const rubik = Rubik({ subsets: ["latin"] });

import Toast from "@/components/Toast/Toast";
//import { useEffect } from "react";

//Descomentar linea 1, 11 y 32 y comentar Metadata para verlos andando
export const metadata: Metadata = {
  title: "Pet Finder",
  description: "Encuentra a tu compañero peludo perdido o adopta a un amigo fiel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const showToast = () => {
  //   Toast.fire({
  //     icon: 'success',
  //     title: '¡Operación exitosa!'
  //   });
  // };

  /* useEffect(() => {
    showToast()
  }, []) */

  return (
    <html lang="en">
      <body className={rubik.className}>
        <AuthProvider>
          <Navbar />
          <DialogProvider>
            <div>{children}</div>
          </DialogProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
