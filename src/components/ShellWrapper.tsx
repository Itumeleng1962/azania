"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HIDDEN_SHELL_PATHS = ['/admin', '/rider'];

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = HIDDEN_SHELL_PATHS.some(p => pathname.startsWith(p));

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 72px)' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
