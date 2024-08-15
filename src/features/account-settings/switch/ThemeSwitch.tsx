'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <h1 className="my-5 font-semibold">Theme</h1>

      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={theme === 'dark'}
          onCheckedChange={state => setTheme(state ? 'dark' : 'light')}
        />
        <Label htmlFor="airplane-mode">Dark mode</Label>
      </div>
    </>
  );
};

export default ThemeSwitch;
