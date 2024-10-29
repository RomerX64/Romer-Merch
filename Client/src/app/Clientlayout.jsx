// app/components/ClientLayout.tsx (Client Component)
"use client";

import { usePathname } from 'next/navigation';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideNavAndFooter = ['/login', '/register'].includes(pathname);

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
