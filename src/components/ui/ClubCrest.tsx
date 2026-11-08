import React from 'react';
import Image from 'next/image';

interface ClubCrestProps {
  className?: string;
  size?: number;
  showStars?: boolean;
  priority?: boolean;
}

export const ClubCrest: React.FC<ClubCrestProps> = ({
  className = '',
  size = 48,
  showStars = true,
  priority = false,
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: showStars ? Math.round(size * 1.25) : size }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/club/crest.svg"
          alt="Churchill Brothers FC Goa Crest"
          fill
          sizes={`${size}px`}
          priority={priority}
          className="object-contain drop-shadow-[0_4px_12px_rgba(200,16,46,0.25)]"
        />
      </div>
    </div>
  );
};
