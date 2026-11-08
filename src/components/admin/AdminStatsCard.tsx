import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'primary' | 'gold';
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'primary',
}) => {
  const badgeClasses = {
    emerald: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    amber: 'bg-amber-950 text-amber-400 border-amber-800',
    primary: 'bg-red-950 text-red-400 border-red-800',
    gold: 'bg-yellow-950 text-yellow-400 border-yellow-800',
  }[badgeColor];

  return (
    <div className="bg-darkSurface border border-zinc-800 rounded-xl p-5 shadow-card flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-zinc-800/80 text-brandGold">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="font-display font-black text-2xl sm:text-3xl text-white">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-zinc-400 mt-1 flex items-center justify-between">
            <span>{subtitle}</span>
            {badge && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeClasses}`}
              >
                {badge}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};
