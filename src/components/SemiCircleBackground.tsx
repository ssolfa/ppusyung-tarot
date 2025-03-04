'use client';
import { useEffect, useState } from 'react';

interface SemiCircleBackgroundProps {
  position?: 'top' | 'bottom';
  color?: string;
  mobileHeight?: string;
  desktopHeight?: string;
  breakpoint?: number;
}

export default function SemiCircleBackground({
  position = 'top',
  color = '#DCDAFF',
  mobileHeight = '20vh',
  desktopHeight = '30vh',
  breakpoint = 768,
}: SemiCircleBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [height, setHeight] = useState('');

  useEffect(() => {
    setIsMounted(true);
    setHeight(window.innerWidth >= breakpoint ? desktopHeight : mobileHeight);

    const handleResize = () => {
      setHeight(window.innerWidth >= breakpoint ? desktopHeight : mobileHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, desktopHeight, mobileHeight]);

  const isTop = position === 'top';

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 w-full overflow-hidden`}
      style={{ height }}
    >
      <div
        className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 w-full bg-transparent`}
        style={{
          height: `calc(${height} * 2)`,
          borderRadius: '50%',
          backgroundColor: color,
          transform: isTop ? `translateY(calc(-${height}))` : `translateY(calc(${height}))`,
        }}
      />
    </div>
  );
}
