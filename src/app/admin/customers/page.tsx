'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { User, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

interface DemoUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'fan';
  isDemo: boolean;
  joinedDate: string;
}

export default function AdminCustomersPage() {
  const { currentUser, orders, bookings } = useApp();

  // Seed customer list
  const [usersList] = useState<DemoUserRecord[]>([
    {
      id: 'usr-1',
      name: 'Antonio D’Souza',
      email: 'fan@churchillbrothers.com',
      phone: '+91 98221 54321',
      role: 'fan',
      isDemo: true,
      joinedDate: '2026-08-14',
    },
    {
      id: 'usr-2',
      name: 'Savio Alemao',
      email: 'admin@churchillbrothers.com',
      phone: '+91 98221 00001',
      role: 'super_admin',
      isDemo: true,
      joinedDate: '2026-01-01',
    },
    {
      id: 'usr-3',
      name: 'Maria Fernandes',
      email: 'maria.f@goamail.in',
      phone: '+91 98225 67890',
      role: 'fan',
      isDemo: true,
      joinedDate: '2026-09-02',
    },
    {
      id: 'usr-4',
      name: 'Francis Colaco',
      email: 'francis.colaco@redmachines.in',
      phone: '+91 98222 34567',
      role: 'fan',
      isDemo: true,
      joinedDate: '2026-10-10',
    },
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Supporters & User Profiles"
        subtitle="Manage registered supporter accounts, role-based access levels, and demo credentials."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-xs text-zinc-400 font-semibold">
            Registered Demo Accounts: <strong className="text-white">{usersList.length} users</strong>
          </span>
          <span className="text-[11px] font-mono text-brandGold bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
            DEMO ROLES ACTIVE
          </span>
        </div>

        <div className="bg-darkSurface border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4">Account Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-brandGold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-400">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      {user.phone}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          user.role === 'super_admin'
                            ? 'bg-primary text-white'
                            : 'bg-zinc-800 text-brandGold'
                        }`}
                      >
                        {user.role === 'super_admin' ? 'SUPER ADMIN' : 'CLUB SUPPORTER'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                      {user.joinedDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750">
                        Demo Account
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
