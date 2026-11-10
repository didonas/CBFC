import React from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-ivory text-ink">
      <div>
        <SiteHeader />
        <main className="w-full">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
