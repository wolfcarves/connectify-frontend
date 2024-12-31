import React from 'react';
import { useTheme } from 'next-themes';
import Typography from '../ui/typography';

const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className="flex gap-x-2 items-center hover:opacity-80">
      {/* <div
        className={`${theme === 'dark' && 'border-white'} bg-primary rounded-md w-10 h-10 p-0.5`}
      /> */}

      <Typography.Span title="VibeOut" weight="bold" size="md" />
    </div>
  );
};

export default Logo;
