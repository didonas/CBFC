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
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    primary: 'bg-red-50 text-red-700 border-red-200',
    gold: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  }[badgeColor];

  return (
    <div className="bg-white border border-lightBorder rounded shadow-card p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-mutedGrey">
          {title}
        </span>
        <div className="p-2 rounded bg-offWhite text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="font-display font-black text-2xl sm:text-3xl text-charcoal">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-mutedGrey mt-1 flex items-center justify-between">
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
