import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminRouteGuard } from '@/components/auth/AdminRouteGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRouteGuard>
      <div className="min-h-screen flex bg-brandBlack text-zinc-100">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {children}
        </div>
      </div>
    </AdminRouteGuard>
  );
}
