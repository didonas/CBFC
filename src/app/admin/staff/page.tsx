'use client';

import React, { useState } from 'react';
import { STAFF_MEMBERS } from '@/lib/demo-data';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StaffMember } from '@/types';
import { UserCheck, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(STAFF_MEMBERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Assistant Coach');
  const [category, setCategory] = useState<'Technical' | 'Medical' | 'Management'>('Technical');
  const [nationality, setNationality] = useState('India');
  const [bio, setBio] = useState('');

  const openAddModal = () => {
    setEditingStaff(null);
    setFullName('');
    setRole('Tactical Analyst');
    setCategory('Technical');
    setNationality('India');
    setBio('First-team performance analyst.');
    setIsModalOpen(true);
  };

  const openEditModal = (s: StaffMember) => {
    setEditingStaff(s);
    setFullName(s.fullName);
    setRole(s.role);
    setCategory(s.category);
    setNationality(s.nationality);
    setBio(s.bio);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((s) => (s.id === editingStaff.id ? { ...s, fullName, role, category, nationality, bio } : s))
      );
    } else {
      const newStaff: StaffMember = {
        id: `s-${Date.now()}`,
        fullName,
        role,
        category,
        nationality,
        bio,
      };
      setStaffList((prev) => [...prev, newStaff]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this staff member record?')) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Coaching & Technical Staff Management"
        subtitle="Manage technical staff, sports medicine specialists, and club directors."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-white p-4 border border-lightBorder shadow-card">
          <span className="text-xs text-mutedGrey font-semibold">
            Registered Staff: <strong className="text-charcoal">{staffList.length} members</strong>
          </span>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="bg-white border border-lightBorder shadow-card p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-lightBorder">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-offWhite border border-lightBorder text-primary">
                    {staff.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(staff)}
                      className="p-1.5 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="p-1.5 rounded bg-offWhite hover:bg-red-50 border border-lightBorder text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-charcoal uppercase mt-3">
                  {staff.fullName}
                </h3>
                <span className="text-xs font-bold text-primary block mt-0.5">
                  {staff.role}
                </span>
                <span className="text-[11px] text-mutedGrey block mt-0.5">
                  {staff.nationality}
                </span>

                <p className="mt-3 text-xs text-mutedGrey leading-relaxed">
                  {staff.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-lightBorder shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-lightBorder pb-3">
              <h3 className="font-display font-black text-xl text-charcoal uppercase">
                {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-mutedGrey hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-charcoal font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Role / Job Title *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Medical">Medical</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Nationality</label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-lightBorder flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-primary hover:bg-deepRed text-white font-display font-bold uppercase tracking-wider"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
